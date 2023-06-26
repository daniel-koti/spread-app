import { ReactElement, useContext, useEffect } from 'react'

import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { Hero } from '@/components/UI/Hero'

import { withSSRAuth } from '@/utils/withSSRAuth'
import { setupAPIClient } from '@/services/api'
import { AuthContext, User } from '@/contexts/AuthContext'

interface ServerSideProps {
  user?: User
}

const HomePage: NextPageWithLayout = ({ user }: ServerSideProps) => {
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    setUser(user)
  }, [setUser, user])

  return (
    <>
      <Hero />
    </>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  const { user } = response.data

  return {
    props: {
      user,
    },
  }
})

export default HomePage
