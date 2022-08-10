import { createUser } from '../../fixture/createUser'
import { makeGraphQLRequest } from '../../../../../test/utils'

type UserCreateResponse = {
  data: {
    userCreate: {
      token: {
        accessToken: string
      }
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
          username: "b"
          password: "123456"
          confirmPassword: "123456"
        }) {
          token {
            accessToken
          }
          error
          clientMutationId
        }
      }
    `

    const userCreateResponse = await makeGraphQLRequest<UserCreateResponse>(userCreateMutation, '')

    expect(userCreateMutation).toBeDefined()

    const { clientMutationId, error, token } = userCreateResponse.data.userCreate

    expect(clientMutationId).toBeDefined()
    expect(error).toBeFalsy()
    expect(token).toBeDefined()
  })

  it('should return an error if the email is already in use', async () => {
    const user = await createUser({ admin: false })

    const userCreateMutation = `
      mutation a {
        userCreate(input: {
          email: "${user.email}"
          fullName: "Adam"
          username: "tester"
          password: "123456"
          confirmPassword: "123456"
        }) {
          token {
            accessToken
          }
          error
          clientMutationId
        }
      }
    `

    const userCreateResponse = await makeGraphQLRequest<UserCreateResponse>(userCreateMutation, '')

    expect(userCreateMutation).toBeDefined()

    const { clientMutationId, error, token } = userCreateResponse.data.userCreate

    expect(clientMutationId).toBeFalsy()
    expect(error).toBeDefined()
    expect(token).toBeFalsy()
  })

  it('should return an error if the username is already in use', async () => {
    const user = await createUser({ admin: false })

    const userCreateMutation = `
      mutation a {
        userCreate(input: {
          email: "another@mail.com"
          fullName: "Adam"
          username: "${user.username}"
          password: "123456"
          confirmPassword: "123456"
        }) {
          token {
            accessToken
          }
          error
          clientMutationId
        }
      }
    `

    const userCreateResponse = await makeGraphQLRequest<UserCreateResponse>(userCreateMutation, '')

    expect(userCreateMutation).toBeDefined()

    const { clientMutationId, error, token } = userCreateResponse.data.userCreate

    expect(clientMutationId).toBeFalsy()
    expect(error).toBeDefined()
    expect(token).toBeFalsy()
  })
})
