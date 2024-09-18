/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosInstance } from 'axios'

import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '../apis/auth.api'
import { isAxiosUnauthorizedError } from './utils'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { ErrorResponse } from '../types/utils.type'

export class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL as string}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // xử lý nếu request có access token thì đính kèm vào authorization gửi lên server
    this.instance.interceptors.request.use(
      (config) => {
        // if (this.accessToken) {
        //   config.headers.Authorization = this.accessToken
        //   return config
        // }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // const { url } = response.config
        // if (url === URL_LOGIN || url === URL_REGISTER) {
        //   const data = response.data as AuthResponse
        //   this.accessToken = data.data.access_token
        //   this.refreshToken = data.data.refresh_token
        //   setAccessTokenToLS(this.accessToken)
        //   setRefreshTokenToLS(this.refreshToken)
        //   setProfileToLS(data.data.user)
        // } else if (url === URL_LOGOUT) {
        //   this.accessToken = ''
        //   this.refreshToken = ''
        //   clearDataLocalStorage()
        // }
        // console.log(response)
        // console.log(url)
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          console.log(error)
          // toast(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          // clearDataLocalStorage()
          // window.location.reload()
        }
      }
    )
  }
}

const http = new Http().instance
export default http
