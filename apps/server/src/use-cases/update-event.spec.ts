import { expect, describe, it, beforeAll } from 'vitest'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { UpdateEventUseCase } from './update-event'

let eventRepository: InMemoryEventsRepository
let sut: UpdateEventUseCase

describe('Update Event Use case', () => {
  beforeAll(() => {
    eventRepository = new InMemoryEventsRepository()
    sut = new UpdateEventUseCase(eventRepository)
  })

  it('should be able to update a event', async () => {
    const eventCreated = await eventRepository.create({
      title: 'Event 1',
      description: 'Description event 1',
      address: 'Rua 1',
      category_id: 'category-01',
      date_start: new Date('2023/12/30'),
      date_end: new Date('2023/12/31'),
      hour_start: '18',
      hour_end: '22',
      type: 'ONLINE',
      user_id: 'producer-01',
    })

    const { event } = await sut.execute({
      eventId: eventCreated.id,
      fields: { title: 'Event' },
    })

    expect(event.title).toEqual('Event')
  })
})
