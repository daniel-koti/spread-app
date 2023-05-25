import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const events = await prisma.event.findMany({
    where: {
      disclosed: {
        not: null,
      },
    },
    orderBy: {
      date_start: 'desc',
    },
  })

  return reply.status(200).send({
    events,
  })
}
