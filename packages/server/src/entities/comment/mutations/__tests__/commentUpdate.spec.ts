import { toGlobalId } from 'graphql-relay'
import { makeGraphQLRequest } from '../../../../../test/utils'
import { createUser } from '../../../user/fixture/createUser'
import { loginUser } from '../../../user/fixture/loginUser'
import { createComment } from '../../fixtures/commentCreate'

type Response = {
  data: {
    commentUpdate: {
      comment: {
        id: string;
        content: string;
      };
      error: string;
    };
  };
  errors: any;
};

describe('CommentUpdateMutation', () => {
  it('should let a user update one of its comments', async () => {
    const user = await createUser({ username: 'user' })
    const { token } = loginUser(user)
    const old = await createComment(user)
    const globalId = toGlobalId('Comment', old.id)
    const newContent = 'new content'

    const mutation = `
      mutation a {
        commentUpdate (input: {
          id: "${globalId}"
          content: "${newContent}"
        }) {
          error
          comment {
            id
            content
          }
        }
      }
    `
    const response = await makeGraphQLRequest<Response>(mutation, token, user)

    expect(response).toBeDefined()
    expect(response.errors).toBeFalsy()
    expect(response.data.commentUpdate.comment.content).toBe(newContent)
    expect(response.data.commentUpdate.comment.content).not.toBe(old.content)
    expect(response.data.commentUpdate.error).toBeFalsy()
  })

  it('should thrown an error if a user tries to update a comment that doesnt belongs to him', async () => {
    const author = await createUser({ username: 'author' })
    const old = await createComment(author)

    const otherUser = await createUser({ username: 'other' })
    const { token } = loginUser(otherUser)

    const globalId = toGlobalId('Comment', old.id)
    const newContent = 'new content'

    const mutation = `
      mutation a {
        commentUpdate (input: {
          id: "${globalId}"
          content: "${newContent}"
        }) {
          error
          comment {
            id
            content
          }
        }
      }
    `
    const response = await makeGraphQLRequest<Response>(mutation, token)
   
    expect(response).toBeDefined()
    expect(response.errors).toBeFalsy()
    expect(response.data.commentUpdate.comment).toBeFalsy()
    expect(response.data.commentUpdate.error).toBe('Unauthorized')
  })
})
