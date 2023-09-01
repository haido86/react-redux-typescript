import jwt_decode from 'jwt-decode'
import { User } from '../types/type'
import { isDecodedToken } from '../types/type-gards'
export function getTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  return token
}

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decodedToken = jwt_decode(token)
    if (!isDecodedToken(decodedToken)) return null

    const user: User = {
      id: decodedToken.user_id,
      username: decodedToken.username,
      role: decodedToken.role
    }

    return user
  } catch (error) {
    return null
  }
}
