import { repositoryFactory } from '../../factories/repository'

type Review = {
  userId: string,
  movieId: string,
  text: string,
  rating: number
}

const reviewRepository = repositoryFactory<Review>('review')

export { reviewRepository }
