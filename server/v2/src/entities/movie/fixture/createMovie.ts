import { createUser } from '../../user/fixture/createUser'
import { createCrew } from '../../crew/fixture/createCrew'
import { MovieModel } from '../movieModel'

export async function createMovie() {
  const crew = await createCrew()
  const user = await createUser({
    admin: true
  })

  const movie = await MovieModel.findOne({ title: 'test movie' })

  if (movie) return movie

  const document = new MovieModel({
    title: 'test movie',
    ageGroup: 'all',
    releaseDate: '2020-01-01',
    duration: '120 min',
    rating: 5,
    actors: [crew._id],
    directors: [crew._id],
    genres: ['action', 'comedy'],
    submitedBy: user._id
  })

  await document.save()

  return document
}
