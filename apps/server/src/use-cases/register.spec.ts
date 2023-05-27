import { expect, describe, it, beforeAll } from 'vitest'

import { RegisterUserUseCase } from './register'

import { UsersRepository } from '@/repositories/users-repository'
import { WalletsRepository } from '@/repositories/wallets-repository'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryWalletsRepository } from '../repositories/in-memory/in-memory-wallets-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: UsersRepository
let walletUsersRepository: WalletsRepository
let sut: RegisterUserUseCase

describe('Register User Use case', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    walletUsersRepository = new InMemoryWalletsRepository()

    sut = new RegisterUserUseCase(usersRepository, walletUsersRepository)
  })

  it('should be able to register an user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
