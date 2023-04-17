import { expect, describe, it, beforeAll } from 'vitest'

import { ProducersRepository } from '@/repositories/producers-repository'
import { RegisterProducerUseCase } from './register-producer'
import { InMemoryProducerRepository } from '../repositories/in-memory/in-memory-producers-repository'

let producersRepository: ProducersRepository
let sut: RegisterProducerUseCase

describe('Register Producer Use case', () => {
  beforeAll(() => {
    producersRepository = new InMemoryProducerRepository()
    sut = new RegisterProducerUseCase(producersRepository)
  })

  it('should be able to register an user', async () => {
    const { producer } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      company: false,
      nif: 'nif',
      phone: '999',
      password: '123456',
    })

    expect(producer.id).toEqual(expect.any(String))
  })
})
