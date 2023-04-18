import { expect, describe, it, beforeAll } from 'vitest'

import { CreateEventUseCase } from './create-event'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'

let eventRepository: InMemoryEventsRepository
let sut: CreateEventUseCase

describe('Create Event Use case', () => {
  beforeAll(() => {
    eventRepository = new InMemoryEventsRepository()
    sut = new CreateEventUseCase(eventRepository)
  })

  it('should be able to create a wallet', async () => {
    const { event } = await sut.execute({
      title: 'Event 1',
      description: 'Description event 1',
      address: 'Rua 1',
      category_id: 'category-01',
      date_start: new Date('2023/12/30'),
      date_end: new Date('2023/12/31'),
      hour_start: '18',
      hour_end: '22',
      type: 'online',
      producer_id: 'producer-01',
    })

    expect(event.id).toEqual(expect.any(String))
  })
})
