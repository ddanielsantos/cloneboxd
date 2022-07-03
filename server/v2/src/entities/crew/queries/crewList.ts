import { GraphQLFieldConfig } from 'graphql'
import { PersonConnection } from '../personTypes'
import { CrewModel } from '../crewModel'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const crewList: GraphQLFieldConfig<any, any, any> = {
  type: PersonConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    const crew = await CrewModel.find({})
    return connectionFromArray(crew, args)
  }
}
