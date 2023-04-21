import { expect, describe, it, beforeAll } from 'vitest'

import { DiscloseEventUseCase } from './disclose-event'

import { DiscloseRepository } from '../repositories/disclose-repository'
import { EventsRepository } from '../repositories/events-repository'
import { InMemoryDiscloseRepository } from '../repositories/in-memory/in-memory-disclosure-repository'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { InMemoryProducerRepository } from '../repositories/in-memory/in-memory-producers-repository'
import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions-repository'

let discloseRepository: DiscloseRepository
let eventsRepository: EventsRepository
let producersRepository: InMemoryProducerRepository
let transactionRepository: InMemoryTransactionsRepository

let sut: DiscloseEventUseCase

describe('Disclose Event Use case', () => {
  beforeAll(() => {
    discloseRepository = new InMemoryDiscloseRepository()
    eventsRepository = new InMemoryEventsRepository()
    producersRepository = new InMemoryProducerRepository()
    transactionRepository = new InMemoryTransactionsRepository()

    sut = new DiscloseEventUseCase(
      discloseRepository,
      transactionRepository,
      eventsRepository,
      producersRepository,
    )
  })

  it('should be able to disclose a event', async () => {
    const producer = await producersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      company: false,
      nif: '021',
      phone: '0123',
      wallet_id: 'wallet-01',
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
      producer_id: producer.id,
    })

    const { disclose } = await sut.execute({
      event_id: event.id,
      approve_status: 'APPROVED',
      producer_id: producer.id,
    })

    expect(disclose.id).toEqual(expect.any(String))
  })
})
