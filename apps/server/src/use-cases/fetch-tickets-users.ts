import { Ticket } from '@prisma/client'
import { TicketRepository } from '@/repositories/ticket-repository'

interface FetchTicketsByUserUseCaseRequest {
  userId: string
}

interface FetchTicketsByUserUseCaseResponse {
  tickets: Ticket[]
}

export class FetchTicketsByUserUseCase {
  constructor(private ticketsRepository: TicketRepository) {}

  async execute({
    userId,
  }: FetchTicketsByUserUseCaseRequest): Promise<FetchTicketsByUserUseCaseResponse> {
    const tickets = await this.ticketsRepository.fetchByUserId(userId)

    return {
      tickets,
    }
  }
}
