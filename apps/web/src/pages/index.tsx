import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'

import { parseCookies } from 'nookies'

import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { Hero } from '@/components/UI/Hero'
import { Events } from '../components/Pages/EventsList'

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
      <Events />
    </>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'spread.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default HomePage
