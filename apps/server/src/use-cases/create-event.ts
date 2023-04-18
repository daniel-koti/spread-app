import { EventsRepository } from '@/repositories/events-repository'

interface CreateEventUseCaseRequest {
  title: string
  description: string
  address: string
  category_id: string
  date_start: Date
  date_end: Date
  hour_start: string
  hour_end: string
  type: string
  latitude?: number
  longitude?: number
  producer_id: string
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    title,
    description,
    address,
    category_id,
    date_start,
    date_end,
    hour_start,
    hour_end,
    latitude,
    type,
    longitude,
    producer_id,
  }: CreateEventUseCaseRequest) {
    const event = await this.eventsRepository.create({
      title,
      description,
      address,
      category_id,
      date_start,
      date_end,
      hour_start,
      hour_end,
      type,
      latitude,
      longitude,
      producer_id,
    })

    return {
      event,
    }
  }
}
