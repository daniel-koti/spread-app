import { ReactElement, useContext, useEffect } from 'react'

import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { Hero } from '@/components/UI/Hero'

import { withSSRAuth } from '@/utils/withSSRAuth'
import { setupAPIClient } from '@/services/api'
import { AuthContext, User } from '@/contexts/AuthContext'
import { Events } from '@/components/Pages/EventsList'

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
      <Hero username={user.name} />
      <div className="px-4">
        <Events />
      </div>
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
