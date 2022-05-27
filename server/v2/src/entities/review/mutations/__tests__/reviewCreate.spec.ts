import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../../../schemas/schema'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'
import { createMovie } from '../../../movie/fixture/createMovie'

describe('ReviewCreateMutation', () => {
  it('should create a review', async () => {
    const movie = await createMovie()
    const user = await createUser()

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
})
