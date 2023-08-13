import { fetchAPI } from "@/utils/fetchAPI"
import { cookies } from "next/headers"
import { Details } from "./Details"

export interface CouponProps {
  id: string
  price: string
  coupon_type: {
    name: string
  }
}

export interface EventProps {
  event: {
    id: string
    title: string
    description: string
    image: string | null
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
    user: {
      name: string
      phone: string
    }
    categoryEvent: {
      name: string
    }
  }
  coupons: CouponProps[]
}


async function getEvent(eventId: string) {
  const token = cookies().get('@spread.token')?.value

  const response = await fetchAPI<EventProps>(`events/${eventId}`, {
    headers: { Authorization: 'Bearer ' + token },
  })

  
  return response
}

export async function WrapperDetails({ id } : { id: string} ) {
  const {event, coupons} = await getEvent(id)

  return (
    
    <Details event={event} coupons={coupons}  />
  )

}