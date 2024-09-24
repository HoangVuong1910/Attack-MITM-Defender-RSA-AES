/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyBits } from 'node-rsa'
import { AuthResponse } from '../types/auth.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'
import { usePublicKey } from '../hooks/usePublicKey'

export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'
export const URL_REFRESH_TOKEN = '/refresh-access-token'
export const URL_PUBLIC_KEY = '/public-key'

export const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  loginAccount(body: { email: string; password: string }, publicKey: any) {
    const cleanPublicKey = publicKey.replace(/\n/g, '')
    return http.post<SuccessResponse<{ [key: string]: string }>>(URL_LOGIN, body, {
      headers: {
        publicKey: JSON.stringify(cleanPublicKey)
      }
    })
  },
  getPublickey() {
    return http.get<SuccessResponse<{ publicKey: KeyBits }>>(URL_PUBLIC_KEY)
  }
}

export default authApi
