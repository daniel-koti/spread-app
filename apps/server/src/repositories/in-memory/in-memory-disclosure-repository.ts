import { randomUUID } from 'node:crypto'
import { Prisma, Disclosure } from '@prisma/client'
import { DiscloseRepository } from '../disclose-repository'

export class InMemoryDiscloseRepository implements DiscloseRepository {
  private items: Disclosure[] = []

  async create(data: Prisma.DisclosureUncheckedCreateInput) {
    const disclose: Disclosure = {
      id: randomUUID(),
      event_id: data.event_id,
      transaction_id: data.transaction_id,
      approve_status: 'APPROVED',
      user_id: data.user_id,
    }

    this.items.push(disclose)

    return disclose
  }
}
