import { toGlobalId } from 'graphql-relay'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'
import { makeGraphQLRequest } from '../../../../../test/utils'

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
    const movieGlobalId = toGlobalId('Movie', '11220')
    const user = await createUser({
      admin: true
    })

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

    const createReviewResponse = await makeGraphQLRequest<CreateReviewResponse>(createReviewMutation, token)

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

    const createReviewResponse = await makeGraphQLRequest<CreateReviewResponse>(createReviewMutation, '')

    expect(createReviewMutation).toBeDefined()

    const { review, error: createMovieError } = createReviewResponse.data.reviewCreate

    expect(createMovieError).toBe('Unauthorized')
    expect(review).toBeFalsy()
  })
})
