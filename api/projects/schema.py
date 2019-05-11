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


class CreateTeam(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        project = graphene.Int()

    ok = graphene.Boolean()
    error_message = graphene.String()
    team = graphene.Field(TeamNode)

    def mutate(self, info, **kwargs):
        try:
            Project.objects.get(id=kwargs['project'], owner=info.context.user)
            team = Project.objects.create(
                name=kwargs['name'],
                project=kwargs['project']
            )
            return CreateTeam(ok=True, team=team)
        except Project.DoesNotExist:
            return CreateTeam(ok=False, error_message='You are not the project owner')



class Mutation(graphene.ObjectType):
    create_project = CreateProjectMutation.Field()
    create_team = CreateTeam.Field()


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectNode)

    def resolve_projects(self, info):
        return Project.objects.filter(owner=info.context.user)
