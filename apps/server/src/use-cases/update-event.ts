import { Event } from '@prisma/client'
import { EventsRepository } from '@/repositories/events-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateEventUseCaseRequestParams {
  title?: string
  description?: string
  address?: string
  category_id?: string
  date_start?: Date
  tickets_qtd?: number
  date_end?: Date
  hour_start?: string
  hour_end?: string
  type?: 'ONLINE' | 'PERSON'
}

interface UpdateEventUseCaseRequest {
  eventId: string
  fields: UpdateEventUseCaseRequestParams
}

interface UpdateEventUseCaseResponse {
  event: Event
}

export class UpdateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    eventId,
    fields,
  }: UpdateEventUseCaseRequest): Promise<UpdateEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      throw new ResourceNotFoundError()
    }

    const updatedEvent = {
      ...event,
      ...fields,
    }

    await this.eventsRepository.save(updatedEvent)

    return {
      event: updatedEvent,
    }
  }
}
