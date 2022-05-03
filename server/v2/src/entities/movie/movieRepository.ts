import { ObjectId } from 'mongodb'
import { repositoryFactory } from '../../factories/repository'

type Movie = {
  title: string,
  duration: string,
  releaseDate: string,
  genres: string[],
  ageGroup: string,
  rating: number,
  actors: string[],
  directors: string[],
  submitedBy: ObjectId
}

const movieRepository = repositoryFactory<Movie>('movie')

export { movieRepository, Movie }
