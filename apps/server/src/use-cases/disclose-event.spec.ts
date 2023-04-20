import { expect, describe, it, beforeAll } from 'vitest'

import { DiscloseEventUseCase } from './disclose-event'

import { DiscloseRepository } from '../repositories/disclose-repository'
import { EventsRepository } from '../repositories/events-repository'
import { InMemoryDiscloseRepository } from '../repositories/in-memory/in-memory-disclosure-repository'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'

let discloseRepository: DiscloseRepository
let eventsRepository: EventsRepository
let sut: DiscloseEventUseCase

describe('Disclose Event Use case', () => {
  beforeAll(() => {
    discloseRepository = new InMemoryDiscloseRepository()
    eventsRepository = new InMemoryEventsRepository()
    sut = new DiscloseEventUseCase(discloseRepository, eventsRepository)
  })

  it('should be able to disclose a event', async () => {
    const event = await eventsRepository.create({
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

    const { disclose } = await sut.execute({
      event_Id: event.id,
      approve_status: 'APPROVED',
      transaction_Id: 'transaction-01',
    })

    expect(disclose.id).toEqual(expect.any(String))
  })
})
