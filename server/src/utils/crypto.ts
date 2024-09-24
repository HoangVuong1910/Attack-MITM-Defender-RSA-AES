import { generateKeyPairSync, privateDecrypt, constants } from 'crypto'

export const createKeyPairSync = async () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  })
  return { publicKey, privateKey }
}
