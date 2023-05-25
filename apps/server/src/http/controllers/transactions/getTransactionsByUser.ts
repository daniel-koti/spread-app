import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getTransactionsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
  })

  const transactions = await prisma.transaction.findMany({
    where: {
      wallet_id: user.wallet_id,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return reply.send({ transactions })
}
