import { GraphQLFieldConfig } from 'graphql'
import { CrewConnection } from '../crewTypes'
import { crewRepository } from '../crewRepository'
import { connectionArgs, connectionFromArray } from 'graphql-relay'

export const crewList: GraphQLFieldConfig<any, any, any> = {
  type: CrewConnection,
  args: connectionArgs,
  resolve: async (_, args) => {
    const crew = await crewRepository.findAll()
    return connectionFromArray(crew, args)
  }
}
