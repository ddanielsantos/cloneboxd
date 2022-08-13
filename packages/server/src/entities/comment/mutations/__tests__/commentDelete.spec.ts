import { toGlobalId } from 'graphql-relay'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'
import { makeGraphQLRequest } from '../../../../../test/utils'
import { createComment } from '../fixtures/commentCreate'

type Response = {
  data: {
    commentDelete: {
      error: string
      deletedId: string
    }
  }
  errors: any
}

describe('DeleteCommentMutation', () => {
  it('should let a user delete one of its comments', async() => {
    const user = await createUser({ username: 'user' })
    const { token } = loginUser(user)
    const comment = await createComment(user)
    
    const globalId = toGlobalId('Comment', comment.id)

    const mutation = `
      mutation a {
        commentDelete (input: {
          id: "${globalId}"
        }) {
          error
          deletedId
        }
      }
    `
    const response = await makeGraphQLRequest<Response>(mutation, token)

    expect(response).toBeDefined()
    expect(response.errors).toBeFalsy()
    expect(response.data.commentDelete.deletedId).toBeDefined()
    expect(response.data.commentDelete.error).toBeFalsy()
  })

  it('should not let a user delete a comment that doesnt belongs to him', async () => {
    const user = await createUser({ username: 'user' })
    const comment = await createComment(user)
    
    const globalId = toGlobalId('Comment', comment.id)
   
    const otherUser = await createUser({ username: 'other' })
    const { token } = loginUser(otherUser)

    const mutation = `
      mutation a {
        commentDelete (input: {
          id: "${globalId}"
        }) {
          error
          deletedId
        }
      }
    ` 
    const response = await makeGraphQLRequest<Response>(mutation, token)

    expect(response).toBeDefined()
    expect(response.errors).toBeFalsy()
    expect(response.data.commentDelete.deletedId).toBeFalsy()
    expect(response.data.commentDelete.error).toBe('Unauthorized')
  })
})
