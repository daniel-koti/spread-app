import { expect, describe, it, beforeAll } from 'vitest'
import { Prisma } from '@prisma/client'

import { DiscloseEventUseCase } from './disclose-event'

import { DiscloseRepository } from '../repositories/disclose-repository'
import { EventsRepository } from '../repositories/events-repository'
import { InMemoryDiscloseRepository } from '../repositories/in-memory/in-memory-disclosure-repository'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions-repository'
import { InMemoryWalletsRepository } from '../repositories/in-memory/in-memory-wallets-repository'
import { InsufficientFundsInWalletError } from './errors/insufficient-funds-in-wallet-error'

let discloseRepository: DiscloseRepository
let eventsRepository: EventsRepository
let usersRepository: InMemoryUsersRepository
let transactionRepository: InMemoryTransactionsRepository
let walletsRepository: InMemoryWalletsRepository

let sut: DiscloseEventUseCase

describe('Disclose Event Use case', () => {
  beforeAll(() => {
    walletsRepository = new InMemoryWalletsRepository()
    discloseRepository = new InMemoryDiscloseRepository()
    eventsRepository = new InMemoryEventsRepository()
    usersRepository = new InMemoryUsersRepository()
    transactionRepository = new InMemoryTransactionsRepository()

    sut = new DiscloseEventUseCase(
      walletsRepository,
      discloseRepository,
      transactionRepository,
      eventsRepository,
      usersRepository,
    )
  })

  it('should be able to disclose a event', async () => {
    const wallet = await walletsRepository.create()

    wallet.amount = new Prisma.Decimal(6000)

    await walletsRepository.save(wallet)

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      type: 'PRODUCER',
      nif: '021',
      phone: '0123',
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
      type: 'ONLINE',
      tickets_qtd: 10,
      user_id: user.id,
    })

    const { disclose } = await sut.execute({
      event_id: event.id,
      user_id: user.id,
    })

    expect(disclose.id).toEqual(expect.any(String))
  })

  it('should not be able to disclose a event with not valid amount in wallet', async () => {
    const wallet = await walletsRepository.create()

    const producer = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      type: 'PRODUCER',
      nif: '021',
      phone: '0123',
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
      type: 'ONLINE',
      tickets_qtd: 10,
      user_id: producer.id,
    })

    await expect(() =>
      sut.execute({
        event_id: event.id,
        user_id: producer.id,
      }),
    ).rejects.toBeInstanceOf(InsufficientFundsInWalletError)
  })

  it('should be able to update wallet amount after a disclose', async () => {
    const wallet = await walletsRepository.create()

    wallet.amount = new Prisma.Decimal(6000)

    const producer = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      type: 'PRODUCER',
      nif: '021',
      phone: '0123',
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
      type: 'ONLINE',
      tickets_qtd: 10,
      user_id: '001',
    })

    await sut.execute({
      event_id: event.id,
      user_id: producer.id,
    })

    expect(wallet.amount).toEqual(new Prisma.Decimal(1000))
  })
})
