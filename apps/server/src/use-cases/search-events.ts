import { EventsRepository } from '@/repositories/events-repository'
import { Event } from '@prisma/client'

interface SearchEventsUseCaseRequest {
  query: string
}

interface SearchEventsUseCaseResponse {
  events: Event[]
}

export class SearchEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    query,
  }: SearchEventsUseCaseRequest): Promise<SearchEventsUseCaseResponse> {
    const events = await this.eventsRepository.searchMany(query)

    return {
      events,
    }
  }
}
