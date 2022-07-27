import mongoose, { Model, Schema } from 'mongoose'
import { sign, verify, JwtPayload } from 'jsonwebtoken'
import { getEnvironmentVariables } from '../../config/env'

export interface IToken {
  user: Schema.Types.ObjectId
  expiresIn: Date
  value: string
}

type AccessToken = string

interface TokenModel extends Model<IToken> {
  generateRefreshToken: (user: string) => Promise<IToken>
  generateAccessToken: (user: string) => string
  refresh: (refreshToken: string) => Promise<AccessToken>
  revoke: (user: string) => Promise<void>
}

const schema = new Schema<IToken, TokenModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  value: {
    type: String
  },
  expiresIn: {
    type: Date,
    required: true
  }
})

type UserIdIfNotStale = {
  stale: true
} | {
  stale: false
  id: string
}

function userIdIfNotStale(token: string, secret: string): UserIdIfNotStale {
  const actualDate = Math.floor(Date.now() / 1000) + 14000
  const decoded = verify(token, secret) as JwtPayload
  const expireDate = decoded.exp!

  if (actualDate > expireDate) {
    return { stale: true }
  }

  return { stale: false, id: decoded.id }
}

schema.static('generateRefreshToken', async function (user: string) {
  const REFRESH_TOKEN_SECRET = getEnvironmentVariables().REFRESH_TOKEN_SECRET || ''
  const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60

  const token = sign({
    id: user
  }, REFRESH_TOKEN_SECRET, {
    expiresIn: SEVEN_DAYS_IN_SECONDS
  })

  const expiresIn = new Date(SEVEN_DAYS_IN_SECONDS * 1000)

  return await this.findOneAndReplace({ user }, {
    user,
    expiresIn,
    value: token
  }, { new: true, upsert: true })
    .select('-user -_id')
})

schema.static('generateAccessToken', function (user: string) {
  const ACCESS_TOKEN_SECRET = getEnvironmentVariables().ACCESS_TOKEN_SECRET || ''

  const token = sign({
    id: user
  }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15min'
  })

  return token
})

schema.static('refresh', async function (refreshToken: string): Promise<AccessToken> {
  const REFRESH_TOKEN_SECRET = getEnvironmentVariables().REFRESH_TOKEN_SECRET || ''
  const JWT = userIdIfNotStale(refreshToken, REFRESH_TOKEN_SECRET)

  if (JWT.stale) {
    throw new Error('Token is stale')
  }

  const token = await this.findOne({ user: JWT.id })

  if (!token) {
    throw new Error('User doesnt have a refresh token')
  }

  return this.generateAccessToken(token.user.toString())
})

schema.static('revoke', async function (user: string) {
  await this.deleteMany({ user })
})

export const Token = mongoose.model<IToken, TokenModel>('token', schema)
