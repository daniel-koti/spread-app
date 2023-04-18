import { expect, describe, it, beforeAll } from 'vitest'

import { RegisterProducerUseCase } from './register-producer'

import { ProducersRepository } from '@/repositories/producers-repository'
import { WalletsRepository } from '@/repositories/wallets-repository'

import { InMemoryProducerRepository } from '../repositories/in-memory/in-memory-producers-repository'
import { InMemoryWalletsRepository } from '../repositories/in-memory/in-memory-wallets-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let producerRepository: ProducersRepository
let walletUsersRepository: WalletsRepository
let sut: RegisterProducerUseCase

describe('Register Producer Use case', () => {
  beforeAll(() => {
    producerRepository = new InMemoryProducerRepository()
    walletUsersRepository = new InMemoryWalletsRepository()

    sut = new RegisterProducerUseCase(producerRepository, walletUsersRepository)
  })

  it('should be able to register an user', async () => {
    const { producer } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      company: false,
      nif: '021',
      phone: '0123',
    })

    expect(producer.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      company: false,
      nif: '021',
      phone: '0123',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        company: false,
        nif: '021',
        phone: '0123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
