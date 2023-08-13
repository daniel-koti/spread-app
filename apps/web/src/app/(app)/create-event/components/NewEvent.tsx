import { fetchAPI } from "@/utils/fetchAPI"
import { cookies } from "next/headers"
import { FormCreateEvent } from "./FormCreateEvent"

interface CreateEventsProps {
  categories?: {
    id: string
    name: string
  }[]
}

async function getCategories() {
  const token = cookies().get('@spread.token')?.value

  const response = await fetchAPI<CreateEventsProps>('categories', {
    headers: { Authorization: 'Bearer ' + token },
  })

  return response.categories
}

export async function NewEvent() {
  const categories = await getCategories()

  return (
    <FormCreateEvent categories={categories}  />
  )

}