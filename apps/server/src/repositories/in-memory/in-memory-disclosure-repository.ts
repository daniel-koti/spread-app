import { randomUUID } from 'node:crypto'
import { Prisma, Disclosure } from '@prisma/client'
import { DiscloseRepository } from '../disclose-repository'

export class InMemoryDiscloseRepository implements DiscloseRepository {
  private items: Disclosure[] = []

  async create(data: Prisma.DisclosureUncheckedCreateInput) {
    const disclose: Disclosure = {
      id: randomUUID(),
      event_Id: data.event_Id,
      transaction_Id: data.transaction_Id,
      approve_status: 'APPROVED',
    }

    this.items.push(disclose)

    return disclose
  }
}
