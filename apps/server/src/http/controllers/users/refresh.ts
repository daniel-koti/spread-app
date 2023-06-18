import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({
      onlyCookie: true,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '2m',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
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
      })
  } catch (err) {
    console.log(err)
    return reply.status(401).send({ message: 'Refresh token is expired' })
  }
}
