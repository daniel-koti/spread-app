import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'
import { DefaultLayout } from '@/components/DefaultLayout'

import { setupAPIClient } from '@/services/api'

import { withSSRAuth } from '@/utils/withSSRAuth'
import { Info } from 'lucide-react'

const MyTickets: NextPageWithLayout = () => {
  return (
    <div className="">
      <header className="bg-white px-6 h-[72px] flex justify-between items-center">
        <strong className="text-slate-900 font-semibold text-2xl">
          Meus bilhetes
        </strong>

        <span className="font-medium text-sm text-gray-500 flex items-center gap-2">
          <Info size={16} />
          Lista dos tickets comprados
        </span>

        <strong className="text-xs text-gray-500">SPREAD</strong>
      </header>
    </div>
  )
}

MyTickets.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/transactions/user')

  const { transactions } = response.data

  return {
    props: {
      transactions,
    },
  }
})

export default MyTickets
