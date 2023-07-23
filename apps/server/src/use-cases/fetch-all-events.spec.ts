import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'

import { FetchEventsUseCase } from './fetch-all-events'

let eventsRepository: InMemoryEventsRepository
let sut: FetchEventsUseCase

describe('Fetch All Events Use Case', () => {
  beforeEach(async () => {
    eventsRepository = new InMemoryEventsRepository()
    sut = new FetchEventsUseCase(eventsRepository)
  })

  it('should be able to fetch events by category Id', async () => {
    await eventsRepository.create({
      title: 'Event 1',
      description: 'Description event 1',
      address: 'Rua 1',
      category_id: 'category-02',
      date_start: new Date('2023/12/30'),
      date_end: new Date('2023/12/31'),
      hour_start: '18',
      hour_end: '22',
      type: 'ONLINE',
      user_id: 'producer-01',
      tickets_qtd: 10,
    })

    await eventsRepository.create({
      title: 'Event 2',
      description: 'Description event 1',
      address: 'Rua 1',
      category_id: 'category-01',
      date_start: new Date('2023/12/30'),
      date_end: new Date('2023/12/31'),
      hour_start: '18',
      hour_end: '22',
      type: 'PERSON',
      user_id: 'producer-02',
      tickets_qtd: 10,
    })

    const { events } = await sut.execute()

    expect(events).toHaveLength(2)
  })
})
