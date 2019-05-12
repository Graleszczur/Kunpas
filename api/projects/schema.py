from graphene_django import DjangoObjectType
from projects.models import Project, Team, Task, TeamMember
from django.utils import timezone
import graphene
from projects.sms import sendSms, sendEmail


class ProjectNode(DjangoObjectType):
    class Meta:
        model = Project


class TeamNode(DjangoObjectType):
    description = graphene.String()
    project_id = graphene.Int()

    class Meta:
        model = Team
        only_fields = ('id', 'description', 'name')

    def resolve_description(self, info):
        names = []
        for user in self.members.all():
            names.append(user.first_name + user.last_name)
        return ', '.join(names)

    def resolve_project_id(self, info):
        return self.project.id

class TaskNode(DjangoObjectType):
    class Meta:
        model = Task
        only_fields = ('status', 'name', 'id', 'description', 'eta')


class TeamMemberNode(DjangoObjectType):
    class Meta:
        model = TeamMember


class CreateProjectMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        description = graphene.String(required=False)

    project = graphene.Field(ProjectNode)

    def mutate(self, info, **kwargs):
        project = Project.objects.create(
            name=kwargs['name'],
            owner=info.context.user,
            description=kwargs.get('description')
        )
        return CreateProjectMutation(project=project)

class TeamMemberEnum(graphene.Enum):
    OWNER = TeamMember.OWNER
    MANAGER = TeamMember.MANAGER
    WORKER = TeamMember.WORKER


class InviteMutation(graphene.Mutation):
    class Arguments:
        user_id = graphene.Int()
        team_id = graphene.Int()
        rank = TeamMemberEnum()

    ok = graphene.Boolean()
    error = graphene.String()
    member = graphene.Field(TeamMemberNode)

    def mutate(self, info, **kwargs):
        try:
            TeamMember.objects.get(user_id=info.context.user, team_id=kwargs['team_id'], rank__in=[TeamMember.OWNER, TeamMember.MANAGER])
            try:
                TeamMember.objects.get(user_id=kwargs['user_id'], team_id=kwargs['team_id'])
                return InviteMutation(ok=False, error='An invited guest is already in this team')
            except TeamMember.DoesNotExist:
                member = TeamMember.objects.create(
                    user_id=kwargs['user_id'],
                    team=Team.objects.get(id=kwargs['team_id']),
                    rank=kwargs['rank'],
                )
                return InviteMutation(ok=True, member=member)
        except TeamMember.DoesNotExist:
            return InviteMutation(ok=False, error='You are not the project owner or manager')


class CreateTeam(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        project_id = graphene.Int()

    ok = graphene.Boolean()
    error_message = graphene.String()
    team = graphene.Field(TeamNode)
    team_member = graphene.Field(TeamMemberNode)

    def mutate(self, info, **kwargs):
        try:
            Project.objects.get(id=kwargs['project_id'], owner=info.context.user)
            team = Team.objects.create(
                name=kwargs['name'],
                project_id=kwargs['project_id']
            )
            team_member = TeamMember.objects.create(
                user = info.context.user,
                team = team,
                rank = TeamMember.OWNER
            )
            return CreateTeam(ok=True, team=team, team_member=team_member)
        except Project.DoesNotExist:
            return CreateTeam(ok=False, error_message='You are not the project owner')


class EditTaskMutation(graphene.Mutation):
    class Arguments:
        task_id = graphene.Int()
        name = graphene.String()
        description = graphene.String()
        eta = graphene.DateTime()
        status = graphene.Boolean()

    ok = graphene.Boolean()
    task = graphene.Field(TaskNode)
    error_message = graphene.String()

    def mutate(self, info, **kwargs):
        try:
            task = Task.objects.get(id=kwargs['task_id'])
            try:
                TeamMember.objects.get(user=info.context.user, team=task.team, rank__in=[TeamMember.OWNER, TeamMember.MANAGER])
                Task.objects.filter(id=kwargs.pop('task_id')).update(**kwargs)
                return EditTaskMutation(task=Task.objects.get(id=task.id), ok=True)
            except TeamMember.DoesNotExist:
                return EditTaskMutation(ok=False, error_message='You do not have permission to edit this task')
        except Task.DoesNotExist:
            return EditTaskMutation(ok=False, error_message='There is no such task')


class CreateTask(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        team_id = graphene.Int()
        description = graphene.String()
        eta = graphene.Date()

    ok = graphene.Boolean()
    error_message = graphene.String()
    task = graphene.Field(TaskNode)

    def mutate(self, info, **kwargs):
        try:
            TeamMember.objects.get(team_id=kwargs['team_id'], user=info.context.user, rank__in=[TeamMember.OWNER, TeamMember.MANAGER])
            task = Task.objects.create(
                name=kwargs['name'],
                team_id=kwargs['team_id'],
                description=kwargs['description'],
                eta=kwargs['eta']
            )
            return CreateTask(ok=True, task=task)
        except TeamMember.DoesNotExist:
            return CreateTask(ok=False, error_message="You can't create a task")

class SendSmsMut(graphene.Mutation):
    class Arguments:
        phone_number = graphene.String()
        message = graphene.String()

    status = graphene.String()

    def mutate(self, info, **kwargs):
        sendSms(kwargs['phone_number'], kwargs['message'])
        return SendSmsMut(status='OK')

class SendEmailMut(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        title = graphene.String()
        message = graphene.String()

    status = graphene.String()

    def mutate(self, info, **kwargs):
        sendEmail(kwargs['email'], kwargs['title'], kwargs['message'])
        return SendEmailMut(status='OK')


class SwitchStatus(graphene.Mutation):
    class Arguments:
        task_id = graphene.Int()

    status = graphene.String()

    def mutate(self, info, **kwargs):
        task = Task.objects.get(id=kwargs['task_id'])
        task.status = not task.status
        task.save()
        return SwitchStatus(status=task.status)


class Mutation(graphene.ObjectType):
    create_project = CreateProjectMutation.Field()
    invite = InviteMutation.Field()
    create_team = CreateTeam.Field()
    edit_task = EditTaskMutation.Field()
    create_task = CreateTask.Field()
    send_sms = SendSmsMut.Field()
    send_email = SendEmailMut.Field()
    switch_status = SwitchStatus.Field()


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectNode, text=graphene.Argument(graphene.String, required=False))
    teams = graphene.List(TeamNode, project_id=graphene.Argument(graphene.String),
        text=graphene.Argument(graphene.String, required=False),
    )
    team = graphene.Field(TeamNode, id=graphene.Int())
    tasks = graphene.List(TaskNode, team_id=graphene.Int(), text=graphene.Argument(graphene.String, required=False))
    task = graphene.Field(TaskNode, id=graphene.Int())


    def resolve_projects(self, info, text=None):
        if text:
            return Project.objects.filter(owner=info.context.user, name__startswith=text)
        return Project.objects.filter(owner=info.context.user)

    def resolve_teams(self, info, project_id, text=None):
        if text:
            return Team.objects.filter(members=info.context.user, project_id=project_id, name__startswith=text)
        return Team.objects.filter(members=info.context.user, project_id=project_id)

    def resolve_team(self, info, **kwargs):
        if kwargs['id'] is not None:
            return Team.objects.get(members=info.context.user, id=kwargs['id'])
        return None

    def resolve_tasks(self, info, **kwargs):
      if kwargs.get('text') is not None:
          return Task.objects.filter(team_id=kwargs['team_id'], name__startswith=kwargs['text'])
      return Task.objects.filter(team_id=kwargs['team_id'])

    def resolve_task(self, info, **kwargs):
        return Task.objects.get(id=kwargs['id'])
