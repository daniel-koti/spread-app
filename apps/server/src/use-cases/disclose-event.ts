import { DiscloseRepository } from '../repositories/disclose-repository'
import { EventsRepository } from '../repositories/events-repository'
import { Disclosure } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DiscloseEventUseCaseRequest {
  event_Id: string
  transaction_Id: string
  approve_status: 'APPROVED' | 'RECUSED'
}

interface DiscloseEventUseCaseResponse {
  disclose: Disclosure
}

export class DiscloseEventUseCase {
  constructor(
    private discloseRepository: DiscloseRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    event_Id,
    approve_status,
    transaction_Id,
  }: DiscloseEventUseCaseRequest): Promise<DiscloseEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(event_Id)

    if (!event) {
      throw new ResourceNotFoundError()
    }

    event.disclosed = new Date()
    await this.eventsRepository.save(event)

    const disclose = await this.discloseRepository.create({
      event_Id,
      approve_status,
      transaction_Id,
    })

    return {
      disclose,
    }
  }
}
