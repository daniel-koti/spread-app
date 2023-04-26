import { prisma } from '@/lib/prisma'
import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function incomeProducerWallet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const incomeWalletSchemaBody = z.object({
    amount: z.number(),
  })

  const { amount } = incomeWalletSchemaBody.parse(request.body)

  const producer = await prisma.producer.findFirstOrThrow({
    where: {
      id: request.user.sub,
    },
  })

  if (!producer) {
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
      wallet_id: producer.wallet_id,
    })

    return reply.status(201).send(transaction)
  } catch (error) {
    return reply.status(500).send()
  }
}
