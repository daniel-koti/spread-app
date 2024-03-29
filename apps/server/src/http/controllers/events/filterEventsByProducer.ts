import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function filterEventsByProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const producerId = request.user.sub

  const events = await prisma.event.findMany({
    where: {
      user_id: producerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      address: true,
      image: true,
      date_start: true,
      date_end: true,
      hour_start: true,
      hour_end: true,
      disclosed: true,
      created_at: true,
      tickets_qtd: true,
      status: true,
      user: {
        select: {
          name: true,
        },
      },
      categoryEvent: {
        select: {
          name: true,
        },
      },
    },
  })

  return reply.status(200).send({ events })
}
