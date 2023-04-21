import { Prisma, Event } from '@prisma/client'
import { EventsRepository } from '../events-repository'
import { prisma } from '@/lib/prisma'

export class PrismaEventsRepository implements EventsRepository {
  async create(data: Prisma.EventUncheckedCreateInput) {
    const event = await prisma.event.create({
      data,
    })

    return event
  }

  async searchMany(query: string) {
    const events = await prisma.event.findMany({
      where: {
        title: query,
      },
    })

    return events
  }

  async findManyByCategoryId(categoryId: string) {
    const events = await prisma.event.findMany({
      where: {
        category_id: categoryId,
      },
    })

    return events
  }

  async findManyProducerId(producerId: string) {
    const events = await prisma.event.findMany({
      where: {
        producer_id: producerId,
      },
    })

    return events
  }

  async findById(id: string) {
    const event = await prisma.event.findFirst({
      where: {
        id,
      },
    })

    return event
  }

  async save(data: Event) {
    const event = await prisma.event.update({
      where: {
        id: data.id,
      },
      data,
    })

    return event
  }

  async fetch() {
    const events = await prisma.event.findMany()
    return events
  }
}
