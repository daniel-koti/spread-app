import { expect, describe, it, beforeAll } from 'vitest'
import { Prisma } from '@prisma/client'

import { BuyTicketUseCase } from './buy-ticket'

import { InMemoryTicketRepository } from '../repositories/in-memory/in-memory-ticket-repository'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions-repository'
import { InMemoryCouponsRepository } from '../repositories/in-memory/in-memory-coupons-repository'
import { EventsRepository } from '../repositories/events-repository'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { InMemoryWalletsRepository } from '../repositories/in-memory/in-memory-wallets-repository'
import { InsufficientFundsInWalletError } from './errors/insufficient-funds-in-wallet'

let eventsRepository: EventsRepository

let ticketRepository: InMemoryTicketRepository
let couponsRepository: InMemoryCouponsRepository
let usersRepository: InMemoryUsersRepository
let transactionRepository: InMemoryTransactionsRepository

let walletsRepository: InMemoryWalletsRepository

let sut: BuyTicketUseCase

describe('Buy Ticket Use case', () => {
  beforeAll(() => {
    eventsRepository = new InMemoryEventsRepository()
    walletsRepository = new InMemoryWalletsRepository()
    ticketRepository = new InMemoryTicketRepository()
    couponsRepository = new InMemoryCouponsRepository()
    usersRepository = new InMemoryUsersRepository()
    transactionRepository = new InMemoryTransactionsRepository()

    sut = new BuyTicketUseCase(
      walletsRepository,
      ticketRepository,
      couponsRepository,
      usersRepository,
      transactionRepository,
    )
  })

  it('should be able to buy a ticket', async () => {
    const wallet = await walletsRepository.create()

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      wallet_id: wallet.id,
    })

    const event = await eventsRepository.create({
      title: 'Event 1',
      description: 'Description event 1',
      address: 'Rua 1',
      category_id: 'category-01',
      date_start: new Date('2023/12/30'),
      date_end: new Date('2023/12/31'),
      hour_start: '18',
      hour_end: '22',
      type: 'online',
      producer_id: 'producer-01',
    })

    const coupon = await couponsRepository.create({
      coupon_type_id: '21A',
      event_id: event.id,
      price: new Prisma.Decimal(0),
    })

    const { ticket } = await sut.execute({
      event_id: event.id,
      coupon_id: coupon.id,
      user_id: user.id,
    })

    expect(ticket.id).toEqual(expect.any(String))
  })

  it('should  not be able to buy a ticket with not valid amount in wallet', async () => {
    const wallet = await walletsRepository.create()

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      wallet_id: wallet.id,
    })

    const event = await eventsRepository.create({
      title: 'Event 1',
      description: 'Description event 1',
      address: 'Rua 1',
      category_id: 'category-01',
      date_start: new Date('2023/12/30'),
      date_end: new Date('2023/12/31'),
      hour_start: '18',
      hour_end: '22',
      type: 'online',
      producer_id: 'producer-01',
    })

    const coupon = await couponsRepository.create({
      coupon_type_id: '21A',
      event_id: event.id,
      price: new Prisma.Decimal(300),
    })

    await expect(() =>
      sut.execute({
        event_id: event.id,
        coupon_id: coupon.id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(InsufficientFundsInWalletError)
  })
})
