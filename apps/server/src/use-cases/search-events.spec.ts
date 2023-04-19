import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { SearchEventsUseCase } from './search-events'

let eventsRepository: InMemoryEventsRepository
let sut: SearchEventsUseCase

describe('Search Events Use Case', () => {
  beforeEach(async () => {
    eventsRepository = new InMemoryEventsRepository()
    sut = new SearchEventsUseCase(eventsRepository)
  })

  it('should be able to search for events', async () => {
    await eventsRepository.create({
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

    await eventsRepository.create({
      title: 'Event 2',
      description: 'Description event 1',
      address: 'Rua 1',
      category_id: 'category-01',
      date_start: new Date('2023/12/30'),
      date_end: new Date('2023/12/31'),
      hour_start: '18',
      hour_end: '22',
      type: 'present',
      producer_id: 'producer-02',
    })

    const { events } = await sut.execute({
      query: 'Event 1',
    })

    expect(events).toHaveLength(1)
    expect(events).toEqual([expect.objectContaining({ title: 'Event 1' })])
  })
})
