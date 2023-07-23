import { Event } from '@prisma/client'
import { EventsRepository } from '@/repositories/events-repository'

interface FetchEventsUseCaseResponse {
  events: Event[]
}

export class FetchEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(): Promise<FetchEventsUseCaseResponse> {
    const events = await this.eventsRepository.fetch()

    return {
      events,
    }
  }
}
