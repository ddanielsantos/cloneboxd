import { repositoryFactory } from '../../factories/repository'

type Review = {
  id: string,
  userId: string,
  movieId: string,
  text: string,
  rating: number
}

const reviewRepository = repositoryFactory<Review>('review')

export { reviewRepository }
