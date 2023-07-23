import { Prisma, Ticket } from '@prisma/client'
import { TicketRepository } from '../ticket-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTicketRepository implements TicketRepository {
  async create(data: Prisma.TicketUncheckedCreateInput) {
    const ticket = await prisma.ticket.create({
      data,
    })

    return ticket
  }

  async fetchByUserId(userId: string) {
    const tickets = await prisma.ticket.findMany({
      where: {
        user_id: userId,
      },
    })

    return tickets
  }

  async validateTicket(ticket: Ticket): Promise<Ticket> {
    const newTicket = await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        ...ticket,
      },
    })

    return newTicket
  }

  async findById(ticketId: string): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
      },
    })

    if (!ticket) {
      return null
    }

    return ticket
  }

  async save(data: Ticket): Promise<Ticket> {
    const updatedTicket = await prisma.ticket.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })

    return updatedTicket
  }
}
