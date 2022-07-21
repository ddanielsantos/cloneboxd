import { GraphQLFieldConfig } from 'graphql'
import { PersonConnection } from '../personTypes'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const crewList: GraphQLFieldConfig<any, any, any> = {
  type: PersonConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    return []
  }
}
