import { Event } from '@prisma/client'
import { EventsRepository } from '@/repositories/events-repository'

interface FetchEventsDisclosedUseCaseResponse {
  events: Event[]
}

export class FetchEventsDisclosedUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(): Promise<FetchEventsDisclosedUseCaseResponse> {
    const events = await this.eventsRepository.fetchAvailable()

    return {
      events,
    }
  }
}
