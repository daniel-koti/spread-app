import { ReactElement, useContext, useEffect } from 'react'
import { GetServerSideProps } from 'next'

import { AuthContext } from '@/contexts/AuthContext'

import { parseCookies } from 'nookies'
import { getAPIClient } from '@/services/axios'
import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { Hero } from '@/components/Hero'

interface ServerSidePropsResponse {
  profile?: {
    name: string
    email: string
    wallet_id: string
  }
}

const HomePage: NextPageWithLayout = ({ profile }: ServerSidePropsResponse) => {
  const { saveNewInfoInContextUser } = useContext(AuthContext)

  useEffect(() => {
    const { email, name, wallet_id: walletId } = profile!

    saveNewInfoInContextUser({
      name,
      email,
      wallet_id: walletId,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <div className="bg-white rounded-lg p-4">
        <strong className="text-xl text-zinc-800 font-medium ">
          Últimos eventos 🎉
        </strong>
      </div>
      <div className="bg-white rounded-lg p-4">
        <strong className="text-xl text-zinc-800 font-medium ">
          Últimos eventos 🎉
        </strong>
      </div>
      <div className="bg-white rounded-lg p-4">
        <strong className="text-xl text-zinc-800 font-medium ">
          Últimos eventos 🎉
        </strong>
      </div>
      <div className="bg-white rounded-lg p-4">
        <strong className="text-xl text-zinc-800 font-medium ">
          Últimos eventos 🎉
        </strong>
      </div>
      <div className="bg-white rounded-lg p-4">
        <strong className="text-xl text-zinc-800 font-medium ">
          Últimos eventos 🎉
        </strong>
      </div>
      <div className="bg-white rounded-lg p-4">
        <strong className="text-xl text-zinc-800 font-medium ">
          Últimos eventos 🎉
        </strong>
      </div>
      <div className="bg-white rounded-lg p-4">
        <strong className="text-xl text-zinc-800 font-medium ">
          Últimos eventos 🎉
        </strong>
      </div>
    </div>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
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

  const { user } = response.data

  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      profile: user,
    },
  }
}

export default HomePage
