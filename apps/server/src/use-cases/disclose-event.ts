import { DiscloseRepository } from '../repositories/disclose-repository'
import { EventsRepository } from '../repositories/events-repository'
import { Disclosure, Prisma } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { TransactionsRepository } from '../repositories/transactions-repository'
import { ProducersRepository } from '../repositories/producers-repository'

interface DiscloseEventUseCaseRequest {
  event_id: string
  producer_id: string
}

interface DiscloseEventUseCaseResponse {
  disclose: Disclosure
}

export class DiscloseEventUseCase {
  constructor(
    private discloseRepository: DiscloseRepository,
    private transactionRepository: TransactionsRepository,
    private eventsRepository: EventsRepository,
    private producersRepository: ProducersRepository,
  ) {}

  async execute({
    event_id,
    producer_id,
  }: DiscloseEventUseCaseRequest): Promise<DiscloseEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(event_id)

    if (!event) {
      throw new ResourceNotFoundError()
    }

    event.disclosed = new Date()

    await this.eventsRepository.save(event)

    const producer = await this.producersRepository.findById(producer_id)

    if (!producer) {
      throw new ResourceNotFoundError()
    }

    const transaction = await this.transactionRepository.create({
      description: 'Divulgar evento',
      price: new Prisma.Decimal(300),
      type: 'OUTCOME',
      wallet_id: producer.wallet_id,
    })

    const disclose = await this.discloseRepository.create({
      event_id,
      transaction_id: transaction.id,
      producer_id,
    })

    return {
      disclose,
    }
  }
}
