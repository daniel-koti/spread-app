import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'
import { makeAuthenticateProducerUseCase } from '@/use-cases/factories/make-authenticate-producer-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateProducerUseCase()

    const { producer } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: producer.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: producer.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
        isUser: false,
        user: producer,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
