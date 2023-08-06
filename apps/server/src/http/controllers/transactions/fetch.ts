import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchTransactionUseCase } from '@/use-cases/factories/make-fetch-transactions-use-case'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllTransactionsUseCase = makeFetchTransactionUseCase()

  try {
    const transactions = await fetchAllTransactionsUseCase.execute()

    return reply.status(200).send(transactions)
  } catch (error) {
    return reply.status(400)
  }
}
