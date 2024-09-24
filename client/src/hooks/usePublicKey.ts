import { useQuery } from '@tanstack/react-query'
import authApi from '../apis/auth.api'

export const usePublicKey = () => {
  const { data: publicKeyData } = useQuery({
    queryKey: ['publicKey'],
    queryFn: authApi.getPublickey
  })
  const publicKey = publicKeyData?.data.data
  return publicKey
}
