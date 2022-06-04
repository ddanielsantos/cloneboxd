import { graphql } from 'graphql'
import { schema } from '../../../../schemas/schema'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'

describe('CrewCreateMutation', () => {
  it('Should throw an error if the user is not an admin', async () => {
    const user = await createUser({
      admin: false
    })

    const { token } = loginUser(user)

    const createCrewMutation = `
    mutation crewC {
      crewCreate(input: {
        name: "john"
        nacionality: "bra"
        dateOfBirth: "2002-02-04"
      }) {
        crew {
          id
        }
        error
      }
    }
    `

    const createCrewResponse = await graphql({
      schema,
      source: createCrewMutation,
      contextValue: {
        authorization: `Bearer ${token}`
      }
    }) as unknown as { data: { crewCreate: { crew: { id: string }, error: string } } }

    const { crew, error: createCrewError } = createCrewResponse.data.crewCreate

    expect(createCrewError).toBe('Unauthorized')
    expect(crew).toBeFalsy()
  })

  it('Should allow admin to create a new crew', async () => {
    const adminUser = await createUser({
      admin: true
    })

    const { token } = loginUser(adminUser)

    const createCrewMutation = `
    mutation crewC {
      crewCreate(input: {
        name: "john"
        nacionality: "bra"
        dateOfBirth: "2002-02-04"
      }) {
        crew {
          id
        }
        error
      }
    }
    `

    const createCrewResponse = await graphql({
      schema,
      source: createCrewMutation,
      contextValue: {
        authorization: `Bearer ${token}`
      }
    }) as unknown as { data: { crewCreate: { crew: { id: string }, error: string } } }

    const { crew, error: createCrewError } = createCrewResponse.data.crewCreate

    expect(createCrewError).toBeFalsy()
    expect(crew).toBeTruthy()
  })
})
