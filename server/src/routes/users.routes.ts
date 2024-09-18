import { Router } from 'express'
import { getPublicKeyController, loginController } from '~/controllers/users.controller'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRoute = Router()

/**
 * API để client lấy khóa công khai RSA
 */
usersRoute.get('/public-key', wrapRequestHandler(getPublicKeyController))

/**
 * API xử lý login, giải mã dữ liệu từ client
 */
usersRoute.post('/login', wrapRequestHandler(loginController))

export default usersRoute
