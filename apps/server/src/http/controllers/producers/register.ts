import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterProducerUseCase } from '@/use-cases/factories/make-register-producer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    nif: z.string().min(8),
    company: z.boolean(),
  })

  const { name, email, password, phone, company, nif } =
    registerBodySchema.parse(request.body)

  try {
    const registerProducerUseCase = makeRegisterProducerUseCase()

    await registerProducerUseCase.execute({
      name,
      email,
      password,
      phone,
      company,
      nif,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
