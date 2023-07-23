import { Ticket } from '@prisma/client'
import { TicketRepository } from '../repositories/ticket-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { TicketNoValidError } from './errors/ticket-not-valid-error'
import { TicketNoReferEventError } from './errors/ticket-not-refer-event-error'

interface ValidateTicketUseCaseRequest {
  ticketId: string
  eventId: string
  option: 'VALID' | 'INVALID'
}

interface ValidateTicketUseCaseResponse {
  ticket: Ticket
}

export class ValidateTicketUseCase {
  constructor(private ticketRepository: TicketRepository) {}

  async execute({
    ticketId,
    eventId,
    option,
  }: ValidateTicketUseCaseRequest): Promise<ValidateTicketUseCaseResponse> {
    const ticket = await this.ticketRepository.findById(ticketId)

    if (!ticket) {
      throw new ResourceNotFoundError()
    }

    const doesTicketBelongToTheEvent = eventId === ticket.event_id

    if (!doesTicketBelongToTheEvent) {
      throw new TicketNoReferEventError()
    }

    const isTicketValid = ticket.status === 'VALID'

    if (!isTicketValid) {
      throw new TicketNoValidError()
    }

    if (option === 'VALID') {
      ticket.status = 'USED'
    } else {
      ticket.status = 'INVALID'
    }

    await this.ticketRepository.save(ticket)

    return {
      ticket,
    }
  }
}
