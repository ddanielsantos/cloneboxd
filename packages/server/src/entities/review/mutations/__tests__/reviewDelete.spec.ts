import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../../../schemas/schema'
import { createReview } from '../../fixtures/createReview'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'
import { ReviewModel } from '../../reviewModel'

type ReviewDeleteResponse = {
  data: {
    reviewDelete: {
      error: string
      clientMutationId: string
      deletedCount: string
    }
  }
}

describe('ReviewDeleteMutation', () => {
  it('should let the user delete one of his reviews', async () => {
    const user = await createUser({ admin: false })
    const review = await createReview()
    const { token } = loginUser(user)

    const reviewsBeforeDeletion = await ReviewModel.count()

    const reviewGlobalId = toGlobalId('Review', review.id)

    const reviewDeleteMutation = `
      mutation a {
        reviewDelete(input: {
          id: "${reviewGlobalId}"
        }) {
          error
          clientMutationId
          deletedCount
        }
      }
    `

    const reviewDeleteResponse = await graphql({
      schema,
      source: reviewDeleteMutation,
      contextValue: {
        authorization: `Bearer ${token}`
      }
    }) as unknown as ReviewDeleteResponse

    expect(reviewDeleteResponse).toBeDefined()

    const { clientMutationId, error, deletedCount } = reviewDeleteResponse.data.reviewDelete
    const reviewsAfterDeletion = await ReviewModel.count()

    expect(clientMutationId).toBeDefined()
    expect(error).toBeFalsy()
    expect(deletedCount).toBeDefined()
    expect(reviewsAfterDeletion).toBe(reviewsBeforeDeletion - Number(deletedCount))
  })
})
