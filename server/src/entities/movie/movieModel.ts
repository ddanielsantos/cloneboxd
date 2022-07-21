import mongoose, { Schema } from 'mongoose'

export type IMovie = {
  title: string
  duration: string
  releaseDate: Date
  genres: string[]
  rating: number
  actors: string[]
  directors: string[]
  submitedBy: string
}

const schema = new Schema<IMovie>({
  title: {
    type: String,
    required: true
  },
  duration: String,
  releaseDate: {
    type: Date,
    required: true
  },
  genres: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  actors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'crew',
      required: true
    }
  ],
  directors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'crew',
      required: true
    }
  ],
  submitedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

schema.index({
  title: 'text'
})

export const MovieModel = mongoose.model('movie', schema)
