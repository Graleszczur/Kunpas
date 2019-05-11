from graphene_django import DjangoObjectType
from projects.models import Project, Team, Task, TeamMember
import graphene


class ProjectNode(DjangoObjectType):
    class Meta:
        model = Project


class TeamNode(DjangoObjectType):
    class Meta:
        model = Team


class TaskNode(DjangoObjectType):
    class Meta:
        model = Task


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

    def mutate(self, info, **kwargs):
        try:
            Project.objects.get(id=kwargs['project_id'], owner=info.context.user)
            team = Team.objects.create(
                name=kwargs['name'],
                project_id=kwargs['project_id']
            )
            return CreateTeam(ok=True, team=team)
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




class Mutation(graphene.ObjectType):
    create_project = CreateProjectMutation.Field()
    invite = InviteMutation.Field()
    create_team = CreateTeam.Field()
    edit_task = EditTaskMutation.Field()


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectNode)

    def resolve_projects(self, info):
        return Project.objects.filter(owner=info.context.user)
