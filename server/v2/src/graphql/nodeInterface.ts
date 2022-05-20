import { fromGlobalId, nodeDefinitions } from 'graphql-relay'
import { Repository } from '../factories/repository'
import { userRepository } from '../entities/user/userRepository'
import { movieRepository } from '../entities/movie/movieRepository'
import { crewRepository } from '../entities/crew/crewRepository'
import { reviewRepository } from '../entities/review/reviewRepository'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    // https://github.com/graphql/graphql-relay-js/blob/main/src/__tests__/starWarsSchema.ts
    // https://github.com/entria/entria-fullstack/blob/master/packages/server/src/interface/NodeInterface.ts
    const { type, id } = fromGlobalId(globalId)

    type MappedRepositories = {
      // TODO: remove any
      [key: string]: Repository<any>
    }

    const lookupRepositories: MappedRepositories = {
      User: userRepository,
      Movie: movieRepository,
      Crew: crewRepository,
      UserReview: reviewRepository
    }

    return lookupRepositories[type].findOne(id) || undefined
  },
  (obj) => {
    if (obj.nacionality) {
      return 'Crew'
    }
    if (obj.fullName) {
      return 'User'
    }
    if (obj.user && obj.movie) {
      return 'UserReview'
    }

    return 'Movie'
  }
)

export { nodeField, nodeInterface }
