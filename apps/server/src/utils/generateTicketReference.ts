import { prisma } from '../lib/prisma'

export async function generateTicketReference() {
  let reference = ''
  let isCharactersValid = false

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  while (!isCharactersValid) {
    for (let i = 0; i <= 4; i++) {
      reference += characters.charAt(
        Math.floor(Math.random() * characters.length),
      )
    }

    const isCodeAlreadyExists = await prisma.ticket.findFirst({
      where: {
        reference,
      },
      select: {
        id: true,
      },
    })

    if (!isCodeAlreadyExists) {
      isCharactersValid = true
    }
  }

  return reference
}
