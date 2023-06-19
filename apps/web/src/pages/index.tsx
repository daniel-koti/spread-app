import { ReactElement, useContext, useEffect } from 'react'

import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { Hero } from '@/components/UI/Hero'

import { withSSRAuth } from '@/utils/withSSRAuth'
import { api } from '@/services/apiClient'
import { setupAPIClient } from '@/services/api'

import { AuthContext } from '@/contexts/AuthContext'

const HomePage: NextPageWithLayout = () => {
  useEffect(() => {
    api.get('/me').then((response) => {
      console.log(response)
    })
  }, [])

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
  console.log('contexto atual', ctx)
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  console.log(response.data)

  return {
    props: {},
  }
})

export default HomePage
