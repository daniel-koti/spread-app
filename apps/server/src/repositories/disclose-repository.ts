import { Prisma, Disclosure } from '@prisma/client'

export interface DiscloseRepository {
  create(data: Prisma.DisclosureUncheckedCreateInput): Promise<Disclosure>
}
