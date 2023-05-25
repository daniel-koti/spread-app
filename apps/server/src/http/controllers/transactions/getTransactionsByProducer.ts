import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getTransactionsByProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const producerId = request.user.sub

  const producer = await prisma.producer.findFirstOrThrow({
    where: {
      id: producerId,
    },
  })

  const transactions = await prisma.transaction.findMany({
    where: {
      wallet_id: producer.wallet_id,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return reply.send({ transactions })
}
