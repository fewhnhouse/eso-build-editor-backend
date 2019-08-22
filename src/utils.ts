import { verify } from 'jsonwebtoken'
import { Context } from './types'
import { ID_Input } from './generated/prisma-client';

export const APP_SECRET = 'appsecret321'

interface Token {
  userId: ID_Input
}

export function getUserId(context: Context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}
