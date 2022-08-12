import { toGlobalId } from 'graphql-relay'
import { createUser } from '../../../user/fixture/createUser'
import { loginUser } from '../../../user/fixture/loginUser'
import { createReview } from '../../fixtures/createReview'
import { makeGraphQLRequest } from '../../../../../test/utils'

type Response = {
  data: {
    reviewUpdate: {
      review: {
        id: string
        text: string
        rating: number
        watchedAt: string
        movie: {
          id: string
        }
        user: {
          id: string
        }
      }
      error: string
      clientMutationId: string
    }
  }
}

describe('ReviewUpdateMutation', () => {
  it('should update a review', async () => {
    const user = await createUser({ admin: false })
    const old = await createReview()
    const { token } = loginUser(user)
    const reviewGlobalId = toGlobalId('Review', old.id)

    const mutation = `
      mutation a {
        reviewUpdate(input: {
          id: "${reviewGlobalId}"
          text: "updated"
          rating: 1
        }) {
          review {
            id
            text
            rating
            watchedAt
            movie {
              id
            }
            user {
              id
            }
          }
          error
          clientMutationId
        }
      }
    `

    const reviewUpdateResponse = await makeGraphQLRequest<Response>(mutation, token, user)

    expect(reviewUpdateResponse).toBeDefined()

    const { clientMutationId, error, review } = reviewUpdateResponse.data.reviewUpdate

    expect(clientMutationId).toBeDefined()
    expect(error).toBeFalsy()
    expect(review).toBeDefined()
    expect(review.text).not.toBe(old.text)
    expect(review.rating).not.toBe(old.rating)
  })
})
