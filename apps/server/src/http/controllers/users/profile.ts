import { prisma } from '@/lib/prisma'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub,
  })

  const wallet = await prisma.wallet.findFirstOrThrow({
    where: {
      id: user.wallet_id,
    },
  })

  return reply.status(200).send({
    user: {
      ...user,
      wallet_id: wallet.id,
      amount: Number(wallet.amount),
      password_hash: undefined,
    },
  })
}
