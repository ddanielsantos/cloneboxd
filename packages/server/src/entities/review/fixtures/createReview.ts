import { ReviewModel } from '../reviewModel'
import { createUser } from '../../user/fixture/createUser'

export async function createReview() {
  const review = await ReviewModel.findOne({ text: 'cool fixture', movie: '11220' })

  if (review) return review

  const user = await createUser({ username: 'user' })

  const document = new ReviewModel({
    text: 'cool fixture',
    rating: 5,
    watchedAt: new Date(),
    user: user.id,
    movie: '11220'
  })

  await document.save()

  return document
}
