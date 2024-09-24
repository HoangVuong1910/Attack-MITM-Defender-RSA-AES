/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Schema, schema } from '../../utils/rules'
import authApi from '../../apis/auth.api'
import { isAxiosUnprocessableEnityError } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import Input from '../../components/Input'
import Button from '../../components/Button'
import path from '../../constants/path'
import { usePublicKey } from '../../hooks/usePublicKey'
import { useEffect } from 'react'
import http from '../../utils/http'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const publicKey = usePublicKey()
  const navigate = useNavigate()

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body, publicKey)
  })

  const onSubmit = handleSubmit((data) => {
    // if (!publicKey) return

    // // Tạo khóa AES-256
    // const aesKey = randomBytes(32).toString('hex')
    // const iv = randomBytes(16)
    // console.log('Tạo khóa AES-256', { aesKey, iv })
    // // result: Tạo khóa AES-256 {aesKey: 'bf0f108f68bc0fc96a768616449cd90e3b36ee40d8cfb184c82063fe0e1e376b', iv: Uint8Array(16)}aesKey: "bf0f108f68bc0fc96a768616449cd90e3b36ee40d8cfb184c82063fe0e1e376b"iv: Uint8Array(16) [195, 139, 237, 24, 35, 123, 79, 8, 228, 208, 53, 195, 44, 246, 86, 124, buffer: ArrayBuffer(16), byteLength: 16, byteOffset: 0, length: 16, Symbol(Symbol.toStringTag): 'Uint8Array'][[Prototype]]: Object

    // // Mã hóa thông tin đăng nhập bằng AES

    // const cipher = createCipheriv('aes-256-cbc', Buffer.from(aesKey, 'hex'), iv)
    // let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex')
    // encryptedData += cipher.final('hex')
    // console.log('Mã hóa thông tin đăng nhập bằng AES', encryptedData)
    // // result: Mã hóa thông tin đăng nhập bằng AES f827b3eaae7d5c55bc81dc26981c642879af881015e5991f23c853a92546f11990020f49353abcd50853c5b2f1cd0cc9bc83c34bf4e04871729bdb1b556a5025

    // // Mã hóa khóa AES bằng RSA
    // const rsa = new NodeRSA(publicKey as unknown as NodeRSA.KeyBits)
    // const encryptedAESKey = rsa.encrypt(aesKey, 'base64')
    // console.log('Mã hóa khóa AES bằng RSA', encryptedAESKey)
    // // result: Mã hóa khóa AES bằng RSA FgjWUXYcN4MUghm2as26Z87dTaIfwn78S2y4+DCmPvTx2IBP6R6Hyv+OwUtM/cfHrDK5MvDFsHHI/z9Y5tecnLX4ajnLXk6yDHecXtA1nvRz7PQCiJieafkm1e04wioWMtDOYXAm76Ju3MlrP1f1U1aKG0V32L2yO8jzLL2SawI9Lr6rPKDVJjIi3ybaRR2QUtEni4S1U+xz1jFZOQQ+CljNgPkkCrQafUKcz6XMjE3APvzK65ynME0ArzRXUJhC7lED8gdjuLsnNIbAj2DWgRPZ6YoIm6UPUx9tivdKRe4A8AFRPPY6XlsBPOLatyqNskWgYiWrNYWVMvATciT0Yw==

    // Gửi dữ liệu đã mã hóa lên server
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     encryptedAESKey,
    //     iv: iv.toString('hex'),
    //     encryptedData
    //   })
    // })

    // const result = await response.json()
    // console.log(result)

    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        // setIsAuthenticated(true)
        // setProfile(data.data.data.user)
        // navigate('/')
      },
      onError: (error: any) => {
        console.log(error)
        if (isAxiosUnprocessableEnityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                name='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />

              <Input
                className='mt-2'
                name='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='[text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.register}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
