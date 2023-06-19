import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { GetServerSideProps } from 'next'

import { setupAPIClient } from '@/services/api'
import { CreateEventForm } from '../components/Pages/CreateEventForm'

interface ServerSideProps {
  categories?: {
    id: string
    name: string
  }[]
}

const UpdateEvent: NextPageWithLayout = ({ categories }: ServerSideProps) => {
  return (
    <div className="my-8 bg-white rounded-lg border-[1px] border-slate-200 max-w-4xl mx-auto">
      <header className="bg-gradient-to-r from-orange-50 to-white p-8 rounded-t-lg border-b border-slate-200">
        <h1 className="text-4xl text-primary-500 font-semibold">
          Criar um evento
        </h1>
      </header>

      <CreateEventForm categories={categories} />
    </div>
  )
}

UpdateEvent.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/categories')

  const { categories } = response.data

  return {
    props: {
      categories,
    },
  }
}

export default UpdateEvent