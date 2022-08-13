import { toGlobalId } from 'graphql-relay'
import { loginUser } from '../../../user/fixture/loginUser'
import { createReview } from '../../../review/fixtures/createReview'
import { createUser } from '../../../user/fixture/createUser'
import { makeGraphQLRequest } from '../../../../../test/utils'

type Response = {
 data: {
   commentCreate: {
     error: string
     comment: {
      id: string
     }
   }
 }
 errors: any
}

describe('CreateCommentMutation', () => {
  it('should create a new comment if the user is logged', async () => {
    const user = await createUser({ admin: false })
    const review = await createReview()
    const { token } = loginUser(user)

    const globalId = toGlobalId('UserReview', review.id)

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

  it('should throw an error if the user isnt logged', async () => {
    const review = await createReview()
    const globalId = toGlobalId('UserReview', review.id)

    const mutation = `
      mutation a {
        commentCreate(input: {
          review: "${globalId}"
          content: "agreed"
        }) {
          error
          comment {
            id
          }
        }
      } 
    `

    const response = await makeGraphQLRequest<Response>(mutation, '')

    expect(response).toBeDefined()
    expect(response.errors).toBeFalsy()
    expect(response.data.commentCreate.comment).toBeFalsy()
    expect(response.data.commentCreate.error).toBeDefined()
  })
})
