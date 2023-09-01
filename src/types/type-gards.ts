import { DecodedToken } from '../slices/authSlice'

export function isDecodedToken(obj: unknown): obj is DecodedToken {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'username' in obj &&
    'user_id' in obj &&
    'role' in obj
  )
}
