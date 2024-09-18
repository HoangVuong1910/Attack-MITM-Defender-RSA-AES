import { AuthResponse } from '../types/auth.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'
export const URL_REFRESH_TOKEN = '/refresh-access-token'
export const URL_PUBLIC_KEY = '/public-key'

export const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  getPublickey() {
    return http.get<SuccessResponse<{ publicKey: string }>>(URL_PUBLIC_KEY)
  }
}

export default authApi
