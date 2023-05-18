import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const categories = await prisma.categoryEvent.findMany()

  return reply.status(200).send({
    categories,
  })
}
