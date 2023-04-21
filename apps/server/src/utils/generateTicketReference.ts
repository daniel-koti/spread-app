import { prisma } from '@/lib/prisma'

export async function generateTicketReference() {
  let reference = ''
  let isCharacterValid = false

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  while (!isCharacterValid) {
    for (let i = 0; i <= 4; i++) {
      reference += characters.charAt(
        Math.floor(Math.random() * characters.length),
      )
    }

    const isCodeAlreadyExists = await prisma.ticket.findFirst({
      where: {
        reference,
      },
    })

    if (!isCodeAlreadyExists) {
      isCharacterValid = true
    }
  }

  return reference
}
