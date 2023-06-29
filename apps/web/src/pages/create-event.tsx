import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'

import { setupAPIClient } from '@/services/api'
import { CreateEventForm } from '../components/Pages/CreateEventForm'
import { withSSRAuth } from '@/utils/withSSRAuth'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface ServerSideProps {
  categories?: {
    id: string
    name: string
  }[]
}

const CreateEvent: NextPageWithLayout = ({ categories }: ServerSideProps) => {
  return (
    <div>
      <header className="bg-white px-6 h-[72px] flex justify-between items-center">
        <Link
          className="border border-gray-400 p-2 rounded-[10px] text-gray-400 hover:bg-gray-50"
          href="/"
        >
          <ArrowLeft size={16} />
        </Link>

        <strong className="font-medium text-gray-500">Adicionar evento</strong>

        <strong className="text-xs text-gray-500">SPREAD</strong>
      </header>

      <div className="px-4">
        <div className="my-8 max-w-5xl w-full  lg:mx-auto bg-white rounded-lg border-[1px] border-slate-200 ">
          <div className="bg-gradient-to-r from-green-50 to-white p-8 rounded-t-lg border-b border-slate-200">
            <h1 className="text-4xl text-green-500 font-semibold">
              Criar um evento
            </h1>
          </div>

          <CreateEventForm categories={categories} />
        </div>
      </div>
    </div>
  )
}

CreateEvent.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/categories')

  const { categories } = response.data

  return {
    props: {
      categories,
    },
  }
})

export default CreateEvent
