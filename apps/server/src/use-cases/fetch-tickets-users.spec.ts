import { describe, it, expect, beforeEach } from 'vitest'

import { FetchTicketsByUserUseCase } from './fetch-tickets-users'
import { InMemoryTicketRepository } from '../repositories/in-memory/in-memory-ticket-repository'

let ticketsRepository: InMemoryTicketRepository
let sut: FetchTicketsByUserUseCase

describe('Fetch Tickets By User Id Use Case', () => {
  beforeEach(async () => {
    ticketsRepository = new InMemoryTicketRepository()
    sut = new FetchTicketsByUserUseCase(ticketsRepository)
  })

  it('should be able to fetch tickets by User Id', async () => {
    await ticketsRepository.create({
      user_id: 'user-01',
      coupon_id: 'coupon-01',
      event_id: 'event-01',
      reference: '01',
      transaction_id: '022',
      status: 'VALID',
    })

    await ticketsRepository.create({
      user_id: 'user-02',
      coupon_id: 'coupon-012',
      event_id: 'event-01',
      reference: '012',
      transaction_id: '0223',
      status: 'VALID',
    })

    const { tickets } = await sut.execute({
      userId: 'user-01',
    })

    expect(tickets).toHaveLength(1)
    expect(tickets).toEqual([expect.objectContaining({ event_id: 'event-01' })])
  })
})
