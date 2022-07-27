import { ReviewModel } from '../../review/reviewModel'

type reviewsPerRating = {
  rating: number
  count: number
}[]

export async function movieReviewsByRating(movie: string): Promise<reviewsPerRating> {
  const aggregationResult: { _id: number; count: number; }[] = await ReviewModel.aggregate([
    {
      $match: {
        movie
      }
    },
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    }
  ])

  const initialReviewsPerRating: reviewsPerRating = [
    { rating: 0.5, count: 0 },
    { rating: 1, count: 0 },
    { rating: 1.5, count: 0 },
    { rating: 2, count: 0 },
    { rating: 2.5, count: 0 },
    { rating: 3, count: 0 },
    { rating: 3.5, count: 0 },
    { rating: 4, count: 0 },
    { rating: 4.5, count: 0 },
    { rating: 5, count: 0 }
  ]

  return initialReviewsPerRating.map(({ rating, count }) => {
    const result = aggregationResult.find(({ _id }) => _id === rating)
    return result ? { rating, count: result.count } : { rating, count }
  })
}
