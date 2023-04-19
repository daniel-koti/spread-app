import { Event, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { EventsRepository } from '../events-repository'

export class InMemoryEventsRepository implements EventsRepository {
  public items: Event[] = []

  async create(data: Prisma.EventUncheckedCreateInput) {
    const event: Event = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      address: data.address,
      category_id: data.category_id,
      date_start: new Date(data.date_start),
      date_end: new Date(data.date_end),
      disclosed: data.disclosed ? new Date(data.disclosed) : null,
      hour_start: data.hour_start,
      type: data.type,
      hour_end: data.hour_end,
      status: data.status ?? 'ENABLED',
      imageUrl: data.imageUrl ?? null,
      latitude: data.latitude
        ? new Prisma.Decimal(data.latitude.toString())
        : null,
      longitude: data.longitude
        ? new Prisma.Decimal(data.longitude.toString())
        : null,
      created_at: new Date(),
      producer_id: data.producer_id,
    }

    this.items.push(event)

    return event
  }

  async searchMany(query: string) {
    return this.items.filter((item) => item.title.includes(query))
  }

  async findManyByCategoryId(categoryId: string) {
    return this.items.filter((item) => item.category_id === categoryId)
  }

  async findManyProducerId(producerId: string) {
    return this.items.filter((item) => item.producer_id === producerId)
  }

  async findById(id: string) {
    const event = this.items.find((item) => item.id === id)

    if (!event) {
      return null
    }

    return event
  }

  async save(event: Event) {
    const eventIndex = this.items.findIndex((item) => item.id === event.id)

    if (eventIndex >= 0) {
      this.items[eventIndex] = event
    }

    return event
  }
}
