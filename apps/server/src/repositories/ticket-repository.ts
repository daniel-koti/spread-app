import { Prisma, Ticket } from '@prisma/client'

export interface TicketRepository {
  create(data: Prisma.TicketUncheckedCreateInput): Promise<Ticket>
  validateTicket(ticket: Ticket): Promise<Ticket>
  fetchByUserId(userId: string): Promise<Ticket[]>
}
