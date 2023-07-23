import { prisma } from '@/lib/prisma'
import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function incomeTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const incomeTransactionBodySchema = z.object({
    amount: z.number(),
    file: z.string(),
  })

  const { amount, file } = incomeTransactionBodySchema.parse(request.body)

  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: request.user.sub,
    },
  })

  if (!user) {
    return reply.status(404).send({
      message: 'User not found',
    })
  }

  const createTransactionUseCase = makeCreateTransactionUseCase()

  try {
    const transaction = await createTransactionUseCase.execute({
      description: 'Carregar a carteira',
      price: amount,
      type: 'INCOME',
      wallet_id: user.wallet_id,
      file,
    })

    return reply.status(201).send(transaction)
  } catch (error) {
    return reply.status(500).send()
  }
}
