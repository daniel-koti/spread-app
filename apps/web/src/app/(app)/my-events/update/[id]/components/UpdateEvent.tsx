import { fetchAPI } from "@/utils/fetchAPI"
import { cookies } from "next/headers"
import { FormUpdateEvent } from "./FormUpdateEvent"
// import { FormUpdateEvent } from "./FormUpdateEvent"

interface CategoriesProps {
  categories: {
    id: string
    name: string
  }[]
}

export interface EventProps {
  event: {
    id: string
    title: string
    description: string
    image: string
    address: string
    category_id: string
    date_start: Date
    date_end: Date
    tickets_qtd: number
    hour_start: string
    hour_end: string
    disclosed: Date | null
    type: 'ONLINE' | 'PERSON'
    created_at: Date
    producer_id?: string
  }
}

async function getCategories() {
  const token = cookies().get('@spread.token')?.value

  const response = await fetchAPI<CategoriesProps>('categories', {
    headers: { Authorization: 'Bearer ' + token },
  })

  return response.categories
}

async function getEvent(eventId: string) {
  const token = cookies().get('@spread.token')?.value

  const response = await fetchAPI<EventProps>(`events/${eventId}`, {
    headers: { Authorization: 'Bearer ' + token },
  })

  return response.event
}

export async function UpdateEvent({ id } : { id: string} ) {
  const [categories, event] = await Promise.all(
    [
      await getCategories(),
      await getEvent(id)
    ]
  )

  return (
    <FormUpdateEvent categories={categories} event={event}/>
  )

}