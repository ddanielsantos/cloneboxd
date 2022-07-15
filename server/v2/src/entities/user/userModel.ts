/* eslint-disable camelcase */
import { sign } from 'jsonwebtoken'
import { compareSync } from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import { getEnvironmentVariables } from '../../config/env'

const ACCESS_TOKEN_SECRET = getEnvironmentVariables().ACCESS_TOKEN_SECRET || ''
const REFRESH_TOKEN_SECRET = getEnvironmentVariables().REFRESH_TOKEN_SECRET || ''

type Token = {
  access_token: string
  refresh_token: string
}

export type IUser = {
  _id: mongoose.Types.ObjectId
  fullName: string
  email: string
  username: string
  password: string
  isAdmin: boolean,
  validatePassword: (plainPassword: string) => boolean,
  generateToken: () => Token
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

schema.methods.generateToken = function (): Token {
  const token = {
    access_token: sign({
      id: this._id.toString(),
      admin: this.isAdmin
    }, ACCESS_TOKEN_SECRET, {
      expiresIn: '15min'
    }),
    refresh_token: sign({
      id: this._id.toString(),
      admin: this.isAdmin
    }, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d'
    })
  }

  return token
}

export const UserModel = mongoose.model<IUser>('user', schema)
