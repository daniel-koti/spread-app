import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryTicketRepository } from '../repositories/in-memory/in-memory-ticket-repository'
import { ValidateTicketUseCase } from './validate-ticket'
import { TicketNoValidError } from './errors/ticket-not-valid-error'

let ticketsRepository: InMemoryTicketRepository
let sut: ValidateTicketUseCase

describe('Validate Tickets', () => {
  beforeEach(async () => {
    ticketsRepository = new InMemoryTicketRepository()
    sut = new ValidateTicketUseCase(ticketsRepository)
  })

  it('should be able to validate a ticket', async () => {
    const ticket = await ticketsRepository.create({
      coupon_id: '00',
      event_id: '02',
      reference: '028491',
      transaction_id: '22f',
      user_id: 'user-01',
      status: 'VALID',
    })

    const response = await sut.execute({
      eventId: '02',
      option: 'VALID',
      ticketId: ticket.id,
    })

    expect(response.ticket.status).toEqual('USED')
  })

  it('should be able to reject a ticket used', async () => {
    const ticket = await ticketsRepository.create({
      coupon_id: '00',
      event_id: '02',
      reference: '028491',
      transaction_id: '22f',
      user_id: 'user-01',
    })

    ticket.status = 'USED'

    console.log(ticket)

    await expect(() =>
      sut.execute({
        eventId: '02',
        option: 'VALID',
        ticketId: ticket.id,
      }),
    ).rejects.toBeInstanceOf(TicketNoValidError)
  })
})
