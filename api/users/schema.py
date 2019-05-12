from graphene_django import DjangoObjectType
from users.models import User
from django.db.models import Q
import graphene


class UserNode(DjangoObjectType):
    class Meta:
        model = User


class CreateUserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        password = graphene.String()
        email = graphene.String()
        phone_number = graphene.String(required=False)

    user = graphene.Field(UserNode)
    error = graphene.String()

    def mutate(self, info, **kwargs):
        if User.objects.filter(Q(username=kwargs['username']) | Q(email=kwargs['email'])).exists():
            return CreateUserMutation(error='Username or email is already taken')
        user = User.objects.create_user(kwargs['username'], kwargs['email'], kwargs['password'], kwargs.get('phone_number', ''))
        return CreateUserMutation(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUserMutation.Field()
