import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../../../schemas/schema'
import { createUser } from '../../fixture/createUser'
import { loginUser } from '../../../user/fixture/loginUser'
import { UserModel } from '../../userModel'

type UserDeleteResponse = {
  data: {
    userDelete: {
      error: string
      clientMutationId: string
      deletedCount: string
    }
  }
}

describe('UserDeleteMutation', () => {
  it('should let the user delete his own account', async () => {
    const user = await createUser({ admin: false })
    const { token } = loginUser(user)

    const usersBeforeDeletion = await UserModel.count()

    const userGlobalId = toGlobalId('User', user.id)

    const userDeleteMutation = `
      mutation a {
        userDelete(input: {
          id: "${userGlobalId}"
        }) {
          error
          clientMutationId
          deletedCount
        }
      }
    `

    const userDeleteResponse = await graphql({
      schema,
      source: userDeleteMutation,
      contextValue: {
        authorization: `Bearer ${token}`
      }
    }) as unknown as UserDeleteResponse

    expect(userDeleteResponse).toBeDefined()

    const { clientMutationId, error, deletedCount } = userDeleteResponse.data.userDelete
    const usersAfterDeletion = await UserModel.count()

    expect(clientMutationId).toBeDefined()
    expect(error).toBeFalsy()
    expect(deletedCount).toBeDefined()
    expect(usersAfterDeletion).toBe(usersBeforeDeletion - Number(deletedCount))
  })
})
