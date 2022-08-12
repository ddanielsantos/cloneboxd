import { loginUser } from '../../../user/fixture/loginUser'
import { createReview } from '../../../review/fixtures/createReview'
import { createUser } from '../../../user/fixture/createUser'
import { makeGraphQLRequest } from '../../../../../test/utils'
import { toGlobalId } from 'graphql-relay'

type Response = {
 data: {
   commentCreate: {
     comment: {
      id: string
     }
   }
 }
 errors: any
}

describe('CreateCommentMutation', () => {
  it('should create a new comment', async () => {
    const user = await createUser({ admin: false })
    const review = await createReview()
    const { token } = loginUser(user)

    const globalId = toGlobalId('Comment', review.id)

    const mutation = `
      mutation a {
        commentCreate(input: {
          review: "${globalId}"
          content: "agreed"
        }) {
          comment {
            id
          }
        }
      } 
    ` 

    const response = await makeGraphQLRequest<Response>(mutation, token)

    expect(response).toBeDefined()
    expect(response.errors).toBeFalsy()
    expect(response.data.commentCreate.comment.id).toBeDefined()
  })
})
