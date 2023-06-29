import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getTicketsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
  })

  const tickets = await prisma.ticket.findMany({
    where: {
      user_id: user.wallet_id,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return reply.send({ tickets })
}
