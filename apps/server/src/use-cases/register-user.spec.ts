import { expect, describe, it, beforeAll } from 'vitest'

import { RegisterUserUseCase } from './register-user'
import { UsersRepository } from '@/repositories/users-repository'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'

let usersRepository: UsersRepository
let sut: RegisterUserUseCase

describe('Register User Use case', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register an user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
