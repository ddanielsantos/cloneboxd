import { Types } from 'mongoose'

export interface IComment {
  user: Types.ObjectId
  content: string
}
