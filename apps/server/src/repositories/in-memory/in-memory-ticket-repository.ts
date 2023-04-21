import { randomUUID } from 'node:crypto'
import { Prisma, Ticket } from '@prisma/client'
import { TicketRepository } from '../ticket-repository'

export class InMemoryTicketRepository implements TicketRepository {
  private items: Ticket[] = []

  async create(data: Prisma.TicketUncheckedCreateInput) {
    const ticket: Ticket = {
      id: randomUUID(),
      event_id: data.event_id,
      transaction_id: data.transaction_id,
      approve_status: 'APPROVED',
      coupon_id: data.coupon_id,
      reference: data.reference,
      created_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(ticket)

    return ticket
  }
}
