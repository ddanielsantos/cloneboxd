import { fromGlobalId, nodeDefinitions } from 'graphql-relay'
import { UserModel } from '../entities/user/userModel'
import { MovieModel } from '../entities/movie/movieModel'
import { CrewModel } from '../entities/crew/crewModel'
import { ReviewModel } from '../entities/review/reviewModel'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    // https://github.com/graphql/graphql-relay-js/blob/main/src/__tests__/starWarsSchema.ts
    // https://github.com/entria/entria-fullstack/blob/master/packages/server/src/interface/NodeInterface.ts
    const { id, type } = fromGlobalId(globalId)

    type ModelLookup = {
      [key: string]: any
    }

    // TODO: refactor this
    const modelLookup: ModelLookup = {
      User: UserModel,
      Movie: MovieModel,
      Crew: CrewModel,
      UserReview: ReviewModel
    }

    return modelLookup[type].findOne(id) || undefined
  },
  (obj) => {
    // TODO: refactor this
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
