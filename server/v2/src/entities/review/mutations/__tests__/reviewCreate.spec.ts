import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../../../schemas/schema'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'
import { createMovie } from '../../../movie/fixture/createMovie'

describe('ReviewCreateMutation', () => {
  it('should create a review if the user is logged', async () => {
    const movie = await createMovie()
    const user = await createUser({
      admin: true
    })

    const movieGlobalId = toGlobalId('Movie', movie._id.toString())

    const { token } = loginUser(user)

    const createReviewMutation = `
      mutation a {
        reviewCreate (input: {
          movie: "${movieGlobalId}"
          text: "test review"
          rating: 4.5
        }) {
          review {
            id
          }
          error
        }
      }
    `

    type CreateReviewResponse = {
      data: {
        reviewCreate: {
          review: {
            id: string
          },
          error: string
        }
      }
    }

    const createReviewResponse = await graphql({
      schema,
      source: createReviewMutation,
      contextValue: {
        authorization: `Bearer ${token}`
      }
    }) as unknown as CreateReviewResponse

    expect(createReviewMutation).toBeDefined()

    const { review, error: createMovieError } = createReviewResponse.data.reviewCreate

    expect(createMovieError).toBeFalsy()
    expect(review.id).toBeDefined()
  })

  it('should throw an error if the user is not logged', async () => {
    const movie = await createMovie()

    const movieGlobalId = toGlobalId('Movie', movie._id.toString())

    const createReviewMutation = `
      mutation a {
        reviewCreate (input: {
          movie: "${movieGlobalId}"
          text: "test review"
          rating: 4.5
        }) {
          review {
            id
          }
          error
        }
      }
    `

    type CreateReviewResponse = {
      data: {
        reviewCreate: {
          review: {
            id: string
          },
          error: string
        }
      }
    }

    const createReviewResponse = await graphql({
      schema,
      source: createReviewMutation,
      contextValue: {
        authorization: `Bearer a`
      }
    }) as unknown as CreateReviewResponse

    expect(createReviewMutation).toBeDefined()

    const { review, error: createMovieError } = createReviewResponse.data.reviewCreate

    expect(createMovieError).toBe('Unauthorized')
    expect(review).toBeFalsy()
  })
})
