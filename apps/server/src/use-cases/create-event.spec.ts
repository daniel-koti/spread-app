import { expect, describe, it, beforeAll } from 'vitest'

import { CreateEventUseCase } from './create-event'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { InMemoryProducerRepository } from '../repositories/in-memory/in-memory-producers-repository'

let eventRepository: InMemoryEventsRepository
let producersRepository: InMemoryProducerRepository
let sut: CreateEventUseCase

describe('Create Event Use case', () => {
  beforeAll(() => {
    eventRepository = new InMemoryEventsRepository()
    producersRepository = new InMemoryProducerRepository()
    sut = new CreateEventUseCase(eventRepository, producersRepository)
  })

  it('should be able to create a event', async () => {
    const producer = await producersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '1234121',
      company: false,
      nif: '021',
      phone: '0123',
      wallet_id: '0289213',
    })

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
      latitude: null,
      longitude: null,
      imageUrl: null,
      producer_id: producer.id,
    })

    expect(event.id).toEqual(expect.any(String))
  })
})
