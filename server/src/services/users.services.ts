import fs from 'fs'
import { privateDecrypt, constants, createDecipheriv, createCipheriv } from 'crypto'
class UsersService {
  getPublicKey() {
    const publicKey = fs.readFileSync('publicKey.pem', 'utf8')
    return publicKey
  }
  async login({ encryptedAESKey, iv, encryptedData }: { encryptedAESKey: any; iv: any; encryptedData: any }) {
    /**
     * Giải mã khóa AES bằng privateKey
     */

    const privateKey = fs.readFileSync('privateKey.pem', 'utf8')
    const decryptedAESKey = privateDecrypt(
      { key: privateKey, padding: constants.RSA_PKCS1_PADDING },
      Buffer.from(encryptedAESKey, 'base64')
    )
    /**
     * Sau khi giải mã khóa AES rồi thì lấy khóa AES giải mã dữ liệu đăng nhập
     */
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(decryptedAESKey.toString(), 'hex'),
      Buffer.from(iv, 'hex')
    )
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8')
    decryptedData += decipher.final('utf8')

    const loginData = JSON.parse(decryptedData)

    const { username, password } = loginData
    let responseMessage: string
    if (username === 'hoang' && password === '123456') {
      responseMessage = JSON.stringify({ success: true, message: 'Đăng nhập thành công' })
    } else {
      responseMessage = JSON.stringify({ success: false, message: 'Đăng nhập thất bại' })
    }

    // Mã hóa dữ liệu bằng khóa AES và gửi lại cho client
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(decryptedAESKey.toString(), 'hex'), Buffer.from(iv, 'hex'))
    let encryptedResponse = cipher.update(responseMessage, 'utf8', 'hex')
    encryptedResponse += cipher.final('hex')

    return {
      encryptedResponse,
      iv: iv.toString('hex')
    }
  }
}
const usersService = new UsersService()
export default usersService
