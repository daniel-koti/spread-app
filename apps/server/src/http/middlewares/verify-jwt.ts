import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const response = await request.jwtVerify()
    console.log(response)
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
