from graphene_django import DjangoObjectType
from projects.models import Project, Team, Task, TeamMember
from django.utils import timezone
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


class CreateTask(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        team_id = graphene.Int()
        description = graphene.String()
        eta = graphene.DateTime()

    ok = graphene.Boolean()
    error_message = graphene.String()
    task = graphene.Field(TaskNode)

    def mutate(self, info, **kwargs):
        try:
            TeamMember.objects.get(team_id=kwargs['team_id'], user=info.context.user, rank__in=[TeamMember.OWNER, TeamMember.MANAGER])
            if kwargs['eta'] < timezone.now():
                return CreateTeam(ok=False, error_message="ETA can't be in the past")
            task = Task.objects.create(
                name=kwargs['name'],
                team_id=kwargs['team_id'],
                description=kwargs['description'],
                eta=kwargs['eta']
            )
            return CreateTask(ok=True, task=task)
        except TeamMember.DoesNotExist:
            return CreateTask(ok=False, error_message="You can't create a task")


class Mutation(graphene.ObjectType):
    create_project = CreateProjectMutation.Field()
    create_team = CreateTeam.Field()
    create_task = CreateTask.Field()
    invite_mutation = InviteMutation.Field()


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectNode)
    teams = graphene.List(TeamNode)
    team = graphene.Field(TeamNode, id=graphene.Int())

    def resolve_projects(self, info):
        return Project.objects.filter(owner=info.context.user)

    def resolve_teams(self, info):
        return Team.objects.filter(members=info.context.user)

    def resolve_team(self, info, **kwargs):
        if kwargs['id'] is not None:
            return Team.objects.get(members=info.context.user, id=kwargs['id'])
        return None