import { fromGlobalId, nodeDefinitions } from 'graphql-relay'
import { userRepository } from '../entities/user/userRepository'
import { movieRepository } from '../entities/movie/movieRepository'
import { crewRepository } from '../entities/crew/crewRepository'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    // https://github.com/graphql/graphql-relay-js/blob/main/src/__tests__/starWarsSchema.ts
    // https://github.com/entria/entria-fullstack/blob/master/packages/server/src/interface/NodeInterface.ts
    const { type, id } = fromGlobalId(globalId)
    console.log(globalId)
    console.log('id: ', id)
    switch (type) {
      case 'User': {
        return userRepository.findOne(id)
      }

      case 'Movie': {
        console.log(id)
        return movieRepository.findOne(id)
      }

      case 'Crew': {
        return crewRepository.findOne(id)
      }
    }
  },
  (obj) => {
    switch (obj.__typename) {
      case 'User': {
        return 'User'
      }

      case 'Movie': {
        return 'Movie'
      }

      case 'Crew': {
        return 'Crew'
      }
    }
  }
)

export { nodeField, nodeInterface }
