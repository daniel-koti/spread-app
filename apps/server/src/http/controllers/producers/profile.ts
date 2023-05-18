import { prisma } from '@/lib/prisma'
import { makeGetProducerProfileUseCase } from '@/use-cases/factories/make-get-producer-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getProducerProfileUseCase = makeGetProducerProfileUseCase()

  const { producer } = await getProducerProfileUseCase.execute({
    producerId: request.user.sub,
  })

  const wallet = await prisma.wallet.findFirstOrThrow({
    where: {
      id: producer.wallet_id,
    },
  })

  return reply.status(200).send({
    user: {
      ...producer,
      wallet_id: wallet.id,
      amount: Number(wallet.amount),
      password_hash: undefined,
    },
  })
}
