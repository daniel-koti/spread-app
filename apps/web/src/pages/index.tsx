import { ReactElement, useContext, useEffect } from 'react'

import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { Hero } from '@/components/UI/Hero'

import { AuthContext } from '@/contexts/AuthContext'
import { withSSRAuth } from '@/utils/withSSRAuth'

const HomePage: NextPageWithLayout = () => {
  const { fetchProfileData } = useContext(AuthContext)

  useEffect(() => {
    fetchProfileData()
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
  return {
    props: {},
  }
})

export default HomePage
