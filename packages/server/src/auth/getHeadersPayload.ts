import Koa from 'koa'
import * as jwt from 'jsonwebtoken'
import { getEnvironmentVariables } from '../config/env'

const jwtSecret = getEnvironmentVariables().ACCESS_TOKEN_SECRET || ''

type KoaHeader = Koa.Context['header']

type TokenPayload = {
  id: string,
  admin: boolean
}

type Response = {
  payload: jwt.JwtPayload & TokenPayload | null,
  error: string | null
}

export function getHeadersPayload(header: KoaHeader): Response {
  const authorization: string = header.authorization || ''

  if (!authorization) {
    return {
      error: 'Unauthorized',
      payload: null
    }
  }

  const parts = authorization.split(' ')

  if (parts.length !== 2) {
    return {
      error: 'Unauthorized',
      payload: null
    }
  }

  const [_, token] = parts

  try {
    const payload = jwt.verify(token, jwtSecret) as jwt.JwtPayload & TokenPayload
    return {
      error: null,
      payload
    }
  } catch {
    return {
      error: 'Unauthorized',
      payload: null
    }
  }
}
