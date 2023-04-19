import { Event } from '@prisma/client'
import { EventsRepository } from '@/repositories/events-repository'

interface FetchEventsByProducerUseCaseRequest {
  producerId: string
}

interface FetchEventsByProducerUseCaseResponse {
  events: Event[]
}

export class FetchEventsByProducerUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    producerId,
  }: FetchEventsByProducerUseCaseRequest): Promise<FetchEventsByProducerUseCaseResponse> {
    const events = await this.eventsRepository.findManyProducerId(producerId)

    return {
      events,
    }
  }
}
