import fs from 'fs'
import { createKeyPairSync } from '~/utils/crypto'
export const initFileKeyPair = async () => {
  const { publicKey, privateKey } = await createKeyPairSync()
  if (!fs.existsSync('publicKey.pem')) {
    fs.writeFileSync('publicKey.pem', publicKey)
  }
  if (!fs.existsSync('privateKey.pem')) {
    fs.writeFileSync('privateKey.pem', privateKey)
  }
}
