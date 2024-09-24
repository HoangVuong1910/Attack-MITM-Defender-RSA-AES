/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosInstance } from 'axios'

import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '../apis/auth.api'
import { isAxiosUnauthorizedError } from './utils'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { ErrorResponse } from '../types/utils.type'

import { randomBytes, createCipheriv } from 'crypto'
import NodeRSA, { Key, KeyBits } from 'node-rsa'
import { usePublicKey } from '../hooks/usePublicKey'

export class Http {
  instance: AxiosInstance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private publicKey: any
  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL as string}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.publicKey = null

    // xử lý nếu request có access token thì đính kèm vào authorization gửi lên server
    this.instance.interceptors.request.use(
      (config) => {
        this.publicKey = config.headers['publicKey']
        if (this.publicKey) {
          console.log('before config', config)
          const data = config.data
          // // Tạo khóa AES-256
          const aesKey = randomBytes(32).toString('hex')
          const iv = randomBytes(16)
          console.log('Tạo khóa AES-256', { aesKey, iv })
          // // result: Tạo khóa AES-256 {aesKey: 'bf0f108f68bc0fc96a768616449cd90e3b36ee40d8cfb184c82063fe0e1e376b', iv: Uint8Array(16)}aesKey: "bf0f108f68bc0fc96a768616449cd90e3b36ee40d8cfb184c82063fe0e1e376b"iv: Uint8Array(16) [195, 139, 237, 24, 35, 123, 79, 8, 228, 208, 53, 195, 44, 246, 86, 124, buffer: ArrayBuffer(16), byteLength: 16, byteOffset: 0, length: 16, Symbol(Symbol.toStringTag): 'Uint8Array'][[Prototype]]: Object

          // // Mã hóa thông tin đăng nhập bằng AES

          const cipher = createCipheriv('aes-256-cbc', Buffer.from(aesKey, 'hex'), iv)
          let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex')
          encryptedData += cipher.final('hex')
          console.log('Mã hóa thông tin đăng nhập bằng AES', encryptedData)
          // // result: Mã hóa thông tin đăng nhập bằng AES f827b3eaae7d5c55bc81dc26981c642879af881015e5991f23c853a92546f11990020f49353abcd50853c5b2f1cd0cc9bc83c34bf4e04871729bdb1b556a5025

          // // Mã hóa khóa AES bằng RSA

          const rsa = new NodeRSA(this.publicKey, 'pkcs1-public')
          // rsa.importKey()
          console.log('check rsa', rsa)

          const encryptedAESKey = rsa.encrypt(aesKey, 'base64')
          // console.log('Mã hóa khóa AES bằng RSA', encryptedAESKey)
          // // result: Mã hóa khóa AES bằng RSA FgjWUXYcN4MUghm2as26Z87dTaIfwn78S2y4+DCmPvTx2IBP6R6Hyv+OwUtM/cfHrDK5MvDFsHHI/z9Y5tecnLX4ajnLXk6yDHecXtA1nvRz7PQCiJieafkm1e04wioWMtDOYXAm76Ju3MlrP1f1U1aKG0V32L2yO8jzLL2SawI9Lr6rPKDVJjIi3ybaRR2QUtEni4S1U+xz1jFZOQQ+CljNgPkkCrQafUKcz6XMjE3APvzK65ynME0ArzRXUJhC7lED8gdjuLsnNIbAj2DWgRPZ6YoIm6UPUx9tivdKRe4A8AFRPPY6XlsBPOLatyqNskWgYiWrNYWVMvATciT0Yw==
          config.data = {
            encryptedAESKey,
            iv: iv.toString('hex'),
            encryptedData
          }
          console.log('after config', config)
        }

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
  setPublicKey(key: KeyBits) {
    this.publicKey = key
  }
}

const http = new Http().instance
export default http
