import { createUser } from '../../user/fixture/createUser'
import { createCrew } from '../../crew/fixture/createCrew'
import { movieRepository, Movie } from '../movieRepository'

export async function createMovie() {
  const crew = await createCrew()
  const user = await createUser()

  const [movie] = await movieRepository.findByProperty({ title: 'test movie' })

  if (movie) return movie

  const movieAttributes: Movie = {
    title: 'test movie',
    ageGroup: 'all',
    releaseDate: '2020-01-01',
    duration: '120 min',
    rating: 5,
    actors: [crew._id],
    directors: [crew._id],
    genres: ['action', 'comedy'],
    submitedBy: user._id
  }

  const { insertedId } = await movieRepository.insertOne(movieAttributes)

  return {
    _id: insertedId,
    ...movieAttributes
  }
}
