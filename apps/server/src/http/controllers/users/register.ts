import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().nullable(),
    nif: z.string().nullable(),
    isCompany: z.boolean(),
    type: z.enum(['ADMIN', 'PRODUCER', 'USER']),
  })

  const { name, email, password, phone, nif, isCompany, type } =
    registerBodySchema.parse(request.body)

  try {
    const registerUserUseCase = makeRegisterUserUseCase()

    await registerUserUseCase.execute({
      name,
      email,
      password,
      phone,
      nif,
      isCompany,
      type,
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
