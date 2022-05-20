import { graphql } from 'graphql'
import { client } from '../../../../db/mongo'
import { fromGlobalId, toGlobalId } from 'graphql-relay'
import { schema } from '../../../../schemas/schema'
import { reviewRepository } from '../../reviewRepository'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'
import { createMovie } from '../../../movie/fixture/createMovie'

let reviewId: string

afterAll(async () => {
  await reviewRepository.deleteOne(reviewId)

  await client.close()
})

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
          insertedId
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
    }) as unknown as { data: { reviewCreate: { insertedId: string, error: string } } }

    expect(createReviewMutation).toBeDefined()

    const { insertedId, error: createMovieError } = createReviewResponse.data.reviewCreate

    expect(createMovieError).toBeFalsy()
    expect(insertedId).toBeTruthy()

    reviewId = fromGlobalId(insertedId).id
  })
})
