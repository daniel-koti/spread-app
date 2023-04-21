import { Ticket } from '@prisma/client'
import { TicketRepository } from '../repositories/ticket-repository'
import { CouponsRepository } from '../repositories/coupons-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { TransactionsRepository } from '@/repositories/transactions-repository'

interface BuyTicketUseCaseRequest {
  event_Id: string
  transaction_Id: string
  approve_status: 'APPROVED' | 'RECUSED'
  coupon_Id: string
  reference: string
  createdAt: Date
}

interface BuyTicketUseCaseResponse {
  ticket: Ticket
}

export class BuyTicketUseCase {
  constructor(
    private ticketRepository: TicketRepository,
    private couponsRepository: CouponsRepository,
    private transactionRepository: TransactionsRepository,
  ) {}

  async execute({
    event_Id,
    approve_status,
    coupon_Id,
    reference,
    createdAt,
    transaction_Id,
  }: BuyTicketUseCaseRequest): Promise<BuyTicketUseCaseResponse> {
    const coupon = await this.couponsRepository.findById(event_Id)

    if (!coupon) {
      throw new ResourceNotFoundError()
    }

    const transaction = this.transactionRepository.create({
      description: 'Compra do bilhete',
      price: 200,
      type: 'OUTCOME',
      wallet_id,
    })

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
