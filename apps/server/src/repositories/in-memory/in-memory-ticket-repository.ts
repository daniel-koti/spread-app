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
      coupon_id: data.coupon_id,
      reference: data.reference,
      status: 'VALID',
      created_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(ticket)

    return ticket
  }

  async validateTicket(data: Ticket): Promise<Ticket> {
    const ticketIndex = this.items.findIndex((ticket) => ticket.id === data.id)

    if (ticketIndex >= 0) {
      this.items[ticketIndex] = data
    }

    return data
  }

  async fetchByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId)
  }

  async findById(ticketId: string): Promise<Ticket | null> {
    const ticket = this.items.find((ticket) => ticket.id === ticketId)

    if (!ticket) {
      return null
    }

    return ticket
  }

  async save(data: Ticket): Promise<Ticket> {
    const ticketIndex = this.items.findIndex((item) => item.id === data.id)

    if (ticketIndex >= 0) {
      this.items[ticketIndex] = data
    }

    return data
  }
}
