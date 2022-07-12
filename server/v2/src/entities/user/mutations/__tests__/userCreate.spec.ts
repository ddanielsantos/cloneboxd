import { graphql } from 'graphql'
import { schema } from '../../../../schemas/schema'
import { createUser } from '../../fixture/createUser'

type UserCreateResponse = {
  data: {
    userCreate: {
      token: string
      error: string
      clientMutationId: string
    }
  }
}

describe('UserCreateMutation', () => {
  it('should create a new user', async () => {
    const userCreateMutation = `
      mutation a {
        userCreate(input: {
          email: "b@a.com"
          fullName: "Adam"
          password: "123456"
          confirmPassword: "123456"
        }) {
          token
          error
          clientMutationId
        }
      }
    `

    const userCreateResponse = await graphql({
      schema,
      source: userCreateMutation
    }) as unknown as UserCreateResponse

    expect(userCreateMutation).toBeDefined()

    const { clientMutationId, error, token } = userCreateResponse.data.userCreate

    expect(clientMutationId).toBeDefined()
    expect(error).toBeFalsy()
    expect(token).toBeDefined()
  })

  it('should return an error if the email is already in use', async () => {
    const _user = await createUser({ admin: false })

    const userCreateMutation = `
      mutation a {
        userCreate(input: {
          email: "tester@mail.com"
          fullName: "Adam"
          password: "123456"
          confirmPassword: "123456"
        }) {
          token
          error
          clientMutationId
        }
      }
    `

    const userCreateResponse = await graphql({
      schema,
      source: userCreateMutation
    }) as unknown as UserCreateResponse

    expect(userCreateMutation).toBeDefined()

    const { clientMutationId, error, token } = userCreateResponse.data.userCreate

    expect(clientMutationId).toBeFalsy()
    expect(error).toBeDefined()
    expect(token).toBeFalsy()
  })
})
