import { EventsRepository } from '@/repositories/events-repository'
import { ProducersRepository } from '@/repositories/producers-repository'
import { NotAuthorizedError } from './errors/not-authorized'

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
  latitude: number | null
  longitude: number | null
  producer_id: string
  imageUrl: string | null
}

export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private producersRepository: ProducersRepository,
  ) {}

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
    imageUrl,
  }: CreateEventUseCaseRequest) {
    const isProducer = await this.producersRepository.findById(producer_id)

    if (!isProducer) {
      throw new NotAuthorizedError()
    }

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
      imageUrl,
    })

    return {
      event,
    }
  }
}
