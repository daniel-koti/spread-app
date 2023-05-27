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
      image: data.image ?? null,

      created_at: new Date(),
      user_id: data.user_id,
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
    return this.items.filter((item) => item.user_id === producerId)
  }

  async findById(id: string) {
    const event = this.items.find((item) => item.id === id)

    if (!event) {
      return null
    }

    return event
  }

  async save(data: Event) {
    const eventIndex = this.items.findIndex((item) => item.id === data.id)

    if (eventIndex >= 0) {
      this.items[eventIndex] = data
    }

    return data
  }

  async fetch() {
    const events = this.items.map((item) => item)
    return events
  }
}
