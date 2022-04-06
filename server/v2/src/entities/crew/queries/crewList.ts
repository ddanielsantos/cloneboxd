import { GraphQLList } from 'graphql'
import { crewRepository } from '../crewRepository'
import { crewType } from '../crewTypes'

export const crewList = {
  type: new GraphQLList(crewType),
  resolve: async () => {
    const crew = await crewRepository.findAll()
    return crew
  }
}
