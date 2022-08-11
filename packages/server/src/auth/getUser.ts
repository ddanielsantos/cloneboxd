import Koa from 'koa'
import * as jwt from 'jsonwebtoken'
import { getEnvironmentVariables } from '../config/env'
import { UserModel } from '../entities/user/userModel'

const jwtSecret = getEnvironmentVariables().ACCESS_TOKEN_SECRET || ''

type TokenPayload = {
  id: string,
  admin: boolean
}

export async function getUser(ctx: Koa.Context) {
  const { authorization } = ctx.headers

  if (!authorization) return null

  const parts = authorization.split(' ')

  if (parts.length !== 2) return null

  const [_, token] = parts

  try {
    const payload = jwt.verify(token, jwtSecret) as jwt.JwtPayload & TokenPayload

    return await UserModel.findById(payload.id)
  } catch {
    return null
  }
}
