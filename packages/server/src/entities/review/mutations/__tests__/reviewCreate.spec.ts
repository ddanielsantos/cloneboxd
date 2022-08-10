import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../../../schemas/schema'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'

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

describe('ReviewCreateMutation', () => {
  it('should create a review if the user is logged', async () => {
    const user = await createUser({
      admin: true
    })

    const movieGlobalId = toGlobalId('Movie', '11220')

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
    const movieGlobalId = toGlobalId('Movie', '11220')

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
