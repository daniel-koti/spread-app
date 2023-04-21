import { Prisma, Ticket } from '@prisma/client'
import { TicketRepository } from '../repositories/ticket-repository'
import { CouponsRepository } from '../repositories/coupons-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface BuyTicketUseCaseRequest {
  event_id: string
  approve_status: 'APPROVED' | 'RECUSED'
  coupon_id: string
  reference: string
  user_id: string
}

interface BuyTicketUseCaseResponse {
  ticket: Ticket
}

export class BuyTicketUseCase {
  constructor(
    private ticketRepository: TicketRepository,
    private couponsRepository: CouponsRepository,
    private usersRepository: UsersRepository,
    private transactionRepository: TransactionsRepository,
  ) {}

  async execute({
    event_id,
    approve_status,
    coupon_id,
    reference,
    user_id,
  }: BuyTicketUseCaseRequest): Promise<BuyTicketUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const coupon = await this.couponsRepository.findById(coupon_id)

    if (!coupon) {
      throw new ResourceNotFoundError()
    }

    const transaction = await this.transactionRepository.create({
      description: 'Compra do bilhete',
      price: new Prisma.Decimal(coupon.price),
      type: 'OUTCOME',
      wallet_id: user.wallet_id,
    })

    const ticket = await this.ticketRepository.create({
      coupon_id: coupon.id,
      approve_status,
      transaction_id: transaction.id,
      event_id,
      reference,
      user_id: user.id,
    })

    return {
      ticket,
    }
  }
}
