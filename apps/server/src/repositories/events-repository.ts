import { Event, Prisma } from '@prisma/client'

export interface EventsRepository {
  create(data: Prisma.EventUncheckedCreateInput): Promise<Event>
  searchMany(query: string): Promise<Event[]>
  findManyByCategoryId(categoryId: string): Promise<Event[]>
}
