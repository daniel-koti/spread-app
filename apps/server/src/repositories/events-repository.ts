import { Event, Prisma } from '@prisma/client'

export interface EventsRepository {
  create(data: Prisma.EventUncheckedCreateInput): Promise<Event>
  searchMany(query: string): Promise<Event[]>
  findManyByCategoryId(categoryId: string): Promise<Event[]>
  findManyProducerId(producerId: string): Promise<Event[]>
  findById(id: string): Promise<Event | null>
  fetch(): Promise<Event[]>
  fetchAvailable(): Promise<Event[]>
  save(data: Event): Promise<Event>
}
