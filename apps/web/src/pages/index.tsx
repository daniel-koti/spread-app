import { GetServerSideProps } from 'next'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

import { parseCookies } from 'nookies'
import { getAPIClient } from '@/services/axios'
import { Header } from '@/components/Header'

interface ServerSidePropsResponse {
  profile: {
    name: string
    email: string
    wallet_id: string
  }
}

export default function Home({ profile }: ServerSidePropsResponse) {
  const { saveNewInfoInContextUser } = useContext(AuthContext)

  useEffect(() => {
    const { email, name, wallet_id: walletId } = profile

    saveNewInfoInContextUser({
      name,
      email,
      wallet_id: walletId,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Header />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { 'spread.token': token } = parseCookies(ctx)
  const { 'spread.isUser': isUser } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const response = await apiClient.get(
    `${isUser === 'true' ? 'users' : 'producers'}/me`,
  )

  return {
    props: {
      profile: response.data.user,
    },
  }
}
