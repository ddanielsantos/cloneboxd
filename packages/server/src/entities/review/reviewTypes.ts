import {
  GraphQLID,
  ThunkObjMap,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputFieldConfig,
  GraphQLList
} from 'graphql'
import { userType } from '../user/userTypes'
import { movieType } from '../movie/movieTypes'
import { UserModel } from '../user/userModel'
import { nodeInterface } from '../../graphql/nodeInterface'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { searchMovieById } from '../../services/tmdb/api'
import { commentType } from '../comment/commentTypes'

export const reviewType = new GraphQLObjectType({
  name: 'UserReview',
  description: `Users review's type`,
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('UserReview', review => review._id),
    user: {
      type: new GraphQLNonNull(userType),
      description: `The user who wrote the review`,
      resolve: async review => {
        const user = await UserModel.findOne({
          _id: review.user
        })
        return user
      }
    },
    movie: {
      type: new GraphQLNonNull(movieType),
      description: `The movie being reviewed`,
      resolve: async review => {
        const { data } = await searchMovieById(review.movie)
        return data
      }
    },
    text: {
      type: GraphQLString,
      description: `User's review`,
      resolve: review => review.text
    },
    rating: {
      type: GraphQLFloat,
      description: `User's rating`,
      resolve: review => review.rating
    },
    watchedAt: {
      type: GraphQLString,
      description: `When the user watched the movie`,
      resolve: review => review.watchedAt
    },
    comments: {
      type: new GraphQLList(commentType),
      description: `Users comments on the review`,
      resolve: review => review.comments
    }
  })
})

export const reviewInputType: ThunkObjMap<GraphQLInputFieldConfig> = {
  movie: {
    type: new GraphQLNonNull(GraphQLID),
    description: `Movie's unique identifier`
  },
  text: {
    type: GraphQLString,
    description: `Users review's text`
  },
  rating: {
    type: GraphQLFloat,
    description: `User review's rating`
  },
  watchedAt: {
    type: GraphQLString,
    description: `When the user watched the movie`
  }
}

export const { connectionType: ReviewConnection, edgeType: MovieEdge } = connectionDefinitions({
  nodeType: reviewType
})
