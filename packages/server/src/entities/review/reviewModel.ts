import mongoose, { ObjectId, Schema } from 'mongoose'
import { IComment } from '../comment/commentModel'

export interface IReview {
  user: ObjectId,
  movie: string,
  text: string,
  rating: number,
  watchedAt: Date,
  comments: IComment[],
}

const commentSchema = new Schema<IComment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const schema = new Schema<IReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  movie: {
    type: String
  },
  text: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  watchedAt: {
    type: Date
  },
  comments: [commentSchema]
})

export const ReviewModel = mongoose.model<IReview>('review', schema)
