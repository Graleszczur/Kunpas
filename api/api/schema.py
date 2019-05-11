import graphene
import graphql_jwt
import projects.schema
import users.schema


class Mutation(projects.schema.Mutation, users.schema.Mutation):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()


class Query(projects.schema.Query):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
