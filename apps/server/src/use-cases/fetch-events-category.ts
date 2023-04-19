import { Event } from '@prisma/client'
import { EventsRepository } from '@/repositories/events-repository'

interface FetchEventsByCategoryUseCaseRequest {
  categoryId: string
}

interface FetchEventsByCategoryUseCaseResponse {
  events: Event[]
}

export class FetchEventsByCategoryUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    categoryId,
  }: FetchEventsByCategoryUseCaseRequest): Promise<FetchEventsByCategoryUseCaseResponse> {
    const events = await this.eventsRepository.findManyByCategoryId(categoryId)

    return {
      events,
    }
  }
}
