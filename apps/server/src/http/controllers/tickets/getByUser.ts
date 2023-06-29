import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getTicketsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const tickets = await prisma.ticket.findMany({
    where: {
      user_id: userId,
    },
    include: {
      event: {
        select: {
          title: true,
          address: true,
        },
      },
      coupon: {
        select: {
          coupon_type: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return reply.send({ tickets })
}
