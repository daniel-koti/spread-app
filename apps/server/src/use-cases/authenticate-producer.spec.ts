import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryProducerRepository } from '../repositories/in-memory/in-memory-producers-repository'
import { AuthenticateProducerUseCase } from './authenticate-producer'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let producersRepository: InMemoryProducerRepository
let sut: AuthenticateProducerUseCase

describe('Authenticate Producer Use Case', () => {
  beforeEach(() => {
    producersRepository = new InMemoryProducerRepository()
    sut = new AuthenticateProducerUseCase(producersRepository)
  })

  it('should be able to authenticate a producer', async () => {
    await producersRepository.create({
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      password_hash: await hash('123456', 6),
      company: false,
      nif: '00001',
      phone: '24213',
      wallet_id: '01',
    })

    const { producer } = await sut.execute({
      email: 'john.smith@gmail.com',
      password: '123456',
    })

    expect(producer.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a producer with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john.smith@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a producer with wrong password', async () => {
    await producersRepository.create({
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      password_hash: await hash('123456', 6),
      company: false,
      nif: '00001',
      phone: '24213',
      wallet_id: '01',
    })

    await expect(() =>
      sut.execute({
        email: 'john.smith@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
