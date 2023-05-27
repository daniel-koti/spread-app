import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { FetchEventsByCategoryUseCase } from './fetch-events-category'

let eventsRepository: InMemoryEventsRepository
let sut: FetchEventsByCategoryUseCase

describe('Fetch Events By Category Id Use Case', () => {
  beforeEach(async () => {
    eventsRepository = new InMemoryEventsRepository()
    sut = new FetchEventsByCategoryUseCase(eventsRepository)
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
    })

    const { events } = await sut.execute({
      categoryId: 'category-01',
    })

    expect(events).toHaveLength(1)
    expect(events).toEqual([expect.objectContaining({ title: 'Event 2' })])
  })
})
