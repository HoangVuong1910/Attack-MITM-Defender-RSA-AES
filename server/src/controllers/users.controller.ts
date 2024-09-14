import { Request, Response } from 'express'
import { USERS_MESSAGE } from '~/constants/message'
import usersService from '~/services/users.services'

export const getPublicKeyController = (req: Request, res: Response) => {
  const result = usersService.getPublicKey()
  return res.status(200).json({
    message: USERS_MESSAGE.GET_PUBLIC_KEY_SUCCESSFULLY,
    data: result
  })
}

export const loginController = (req: Request, res: Response) => {
  const { encryptedAESKey, iv, encryptedData } = req.body
  const result = usersService.login({ encryptedAESKey, iv, encryptedData })
  return res.status(200).json({
    message: USERS_MESSAGE.LOGIN_SUCCESSFULLY,
    data: result
  })
}
