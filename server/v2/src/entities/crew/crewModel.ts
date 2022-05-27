import mongoose, { Schema } from 'mongoose'

export type ICrew = {
  name: string
  dateOfBirth: Date
}

const schema = new Schema<ICrew>({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  }
})

schema.index({
  name: 'text'
})

export const CrewModel = mongoose.model<ICrew>('crew', schema)
