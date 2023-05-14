import { GetServerSideProps } from 'next'

import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import { DefaultLayout } from '@/components/DefaultLayout'
import { getAPIClient } from '@/services/axios'

import { Empty } from '../../components/UI/Empty'
import { Event } from '@/components/UI/Event'

interface ServerSideProps {
  events?: {
    id: string
    title: string
    description: string
    imageUrl: string
    address: string
    category_id: string
    date_start: Date
    date_end: Date
    latitude: number | null
    longitude: number | null
    hour_start: string
    hour_end: string
    type: 'online' | 'person'
    disclosed: Date | null
  }[]
}

const MyEvents: NextPageWithLayout = ({ events }: ServerSideProps) => {
  const quantity = events?.length!

  return (
    <div className="mt-4">
      {quantity >= 1 ? (
        <div className="grid grid-cols-4 gap-3 items-start">
          {events?.map((event) => {
            return (
              <Event
                key={event.id}
                disclosed={event.disclosed}
                date={event.date_start}
                id={event.id}
                title={event.title}
                imageUrl={event.imageUrl}
                type={event.type}
                isEdit
              />
            )
          })}
        </div>
      ) : (
        <Empty description="Não existem eventos criados por si 😮‍💨" />
      )}
    </div>
  )
}

MyEvents.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const response = await apiClient.get('/events/producer')

  console.log(ctx)

  const { events } = response.data

  return {
    props: {
      events,
    },
  }
}

export default MyEvents
