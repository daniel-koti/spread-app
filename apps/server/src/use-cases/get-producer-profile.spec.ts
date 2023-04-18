import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryProducerRepository } from '../repositories/in-memory/in-memory-producers-repository'
import { hash } from 'bcryptjs'
import { GetProducerProfileUseCase } from './get-producer-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let producersRepository: InMemoryProducerRepository
let sut: GetProducerProfileUseCase

describe('Get Producer Profile Use Case', () => {
  beforeEach(() => {
    producersRepository = new InMemoryProducerRepository()
    sut = new GetProducerProfileUseCase(producersRepository)
  })

  it('should be able to get producer profile', async () => {
    const createdProducer = await producersRepository.create({
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      password_hash: await hash('123456', 6),
      wallet_id: '01',
      company: false,
      nif: '01',
      phone: '000',
    })

    const { producer } = await sut.execute({
      producerId: createdProducer.id,
    })

    expect(producer.name).toEqual('John Smith')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({ producerId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
