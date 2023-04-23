import { makeGetProducerProfileUseCase } from '@/use-cases/factories/make-get-producer-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getProducerProfileUseCase = makeGetProducerProfileUseCase()

  const { producer } = await getProducerProfileUseCase.execute({
    producerId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...producer,
      password_hash: undefined,
    },
  })
}
