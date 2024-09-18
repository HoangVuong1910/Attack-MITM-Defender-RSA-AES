import { useQuery } from '@tanstack/react-query'
import authApi from '../apis/auth.api'

export const usePublicKey = () => {
  const { data: publicKey } = useQuery({
    queryKey: ['publicKey'],
    queryFn: authApi.getPublickey
  })
  return publicKey
}
