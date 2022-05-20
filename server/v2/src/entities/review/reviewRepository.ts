import { ObjectId } from 'mongodb'
import { repositoryFactory } from '../../factories/repository'

type Review = {
  user: ObjectId,
  movie: ObjectId,
  text: string,
  rating: number,
  watchedAt: string
}

const reviewRepository = repositoryFactory<Review>('review')

export { reviewRepository, Review }
