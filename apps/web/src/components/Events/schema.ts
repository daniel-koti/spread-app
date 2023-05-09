export interface Event {
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
  type: string
}
