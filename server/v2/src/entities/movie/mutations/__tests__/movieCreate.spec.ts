import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../../../schemas/schema'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'
import { createCrew } from '../../../crew/fixture/createCrew'

describe('MovieCreateMutation', () => {
  it('should create a movie', async () => {
    const adminUser = await createUser()
    const crewMember = await createCrew()

    const crewMemberId = crewMember._id.toString()
    const crewMemberGlobalId = toGlobalId('Crew', crewMemberId)

    const { token } = loginUser(adminUser)

    const createMovieMutation = `
    mutation d {
      movieCreate(
        input: {
          title: "bam bam rhe"
          duration: "12 min"
          releaseDate: "2020-02-02"
          genres: ["comedy"]
          ageGroup: "E"
          rating: 4
          actors: ["${crewMemberGlobalId}"]
          directors: ["${crewMemberGlobalId}"]
        }
      ) {
        error
        movie {
          id
        }
      }
    }
    `

    const createMovieResponse = await graphql({
      schema,
      source: createMovieMutation,
      contextValue: {
        authorization: `Bearer ${token}`
      }
    }) as unknown as { data: { movieCreate: { movie: { id: string }, error: string } } }

    const { movie, error: createMovieError } = createMovieResponse.data.movieCreate

    expect(createMovieError).toBeFalsy()
    expect(movie).toBeTruthy()
  })
})
