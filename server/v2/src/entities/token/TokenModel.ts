import mongoose, { Model, Schema } from 'mongoose'

export interface IToken {
  user: Schema.Types.ObjectId
  expiresIn: Date
  refreshToken: string
}

// type AccessToken = string

interface TokenModel extends Model<IToken> {
  // generateRefreshToken: (user: string) => Promise<IToken>
  generateAccessToken: (user: string) => string
  // refresh: (refreshToken: string) => Promise<AccessToken>
  // revoke: (user: string) => Promise<void>
}

const schema = new Schema<IToken, TokenModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  refreshToken: {
    type: String,
    unique: true
  },
  expiresIn: {
    type: Date,
    required: true
  }
})

export const Token = mongoose.model<IToken, TokenModel>('token', schema)
