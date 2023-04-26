import { Prisma, Ticket } from '@prisma/client'
import { TicketRepository } from '../repositories/ticket-repository'
import { CouponsRepository } from '../repositories/coupons-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { generateTicketReference } from '../utils/generateTicketReference'
import { InsufficientFundsInWalletError } from './errors/insufficient-funds-in-wallet'
import { WalletsRepository } from '../repositories/wallets-repository'

interface BuyTicketUseCaseRequest {
  event_id: string
  coupon_id: string
  user_id: string
}

interface BuyTicketUseCaseResponse {
  ticket: Ticket
}

export class BuyTicketUseCase {
  constructor(
    private walletsRepository: WalletsRepository,
    private ticketRepository: TicketRepository,
    private couponsRepository: CouponsRepository,
    private usersRepository: UsersRepository,
    private transactionRepository: TransactionsRepository,
  ) {}

  async execute({
    event_id,
    coupon_id,
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

    const wallet = await this.walletsRepository.findById(user.wallet_id)

    if (!wallet) {
      throw new ResourceNotFoundError()
    }

    if (Number(wallet.amount) < Number(coupon.price)) {
      throw new InsufficientFundsInWalletError()
    }

    wallet.amount = new Prisma.Decimal(
      Number(wallet.amount) - Number(coupon.price),
    )

    this.walletsRepository.save(wallet)

    const transaction = await this.transactionRepository.create({
      description: 'Compra de bilhete',
      price: new Prisma.Decimal(coupon.price),
      type: 'OUTCOME',
      wallet_id: user.wallet_id,
    })

    const ticket = await this.ticketRepository.create({
      coupon_id: coupon.id,
      transaction_id: transaction.id,
      event_id,
      reference: await generateTicketReference(),
      user_id: user.id,
    })

    return {
      ticket,
    }
  }
}
