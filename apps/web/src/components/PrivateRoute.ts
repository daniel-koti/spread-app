import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface PrivateRouteProps {
  children: any
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('spread:token')

    if (!token) {
      router.push('/signin')
    }
  }, [router])

  return children
}
