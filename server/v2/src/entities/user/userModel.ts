import { compareSync } from 'bcrypt'
import mongoose, { Schema } from 'mongoose'

export type IUser = {
  _id: mongoose.Types.ObjectId
  fullName: string
  email: string
  username: string
  password: string
  isAdmin: boolean,
  validatePassword: (plainPassword: string) => boolean,
}

const schema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

schema.index({
  fullName: 'text',
  email: 'text'
})

schema.methods.validatePassword = function (plainPassword: string): boolean {
  return compareSync(plainPassword, this.password)
}

export const UserModel = mongoose.model<IUser>('user', schema)
