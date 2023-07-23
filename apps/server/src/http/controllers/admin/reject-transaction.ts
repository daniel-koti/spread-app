import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateTransactionUseCase } from '../../../use-cases/factories/make-validate-transaction-use-case'

export async function rejectTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateTransactionBodySchema = z.object({
    walletId: z.string(),
    transactionId: z.string(),
  })

  const { transactionId, walletId } = validateTransactionBodySchema.parse(
    request.body,
  )

  const validateTransactionUseCase = makeValidateTransactionUseCase()

  try {
    await validateTransactionUseCase.execute({
      transactionId,
      walletId,
      option: 'INVALID',
    })

    return reply.status(200).send()
  } catch (error) {
    return reply.status(400)
  }
}
