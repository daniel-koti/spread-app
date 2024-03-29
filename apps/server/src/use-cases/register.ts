import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { WalletsRepository } from '@/repositories/wallets-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string | null
  nif: string | null
  isCompany: boolean
  type: 'ADMIN' | 'PRODUCER' | 'USER'
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private walletsRepository: WalletsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
    isCompany,
    nif,
    type,
  }: RegisterUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const wallet = await this.walletsRepository.create()

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      phone,
      isCompany,
      nif,
      wallet_id: wallet.id,
      type,
    })

    return {
      user,
    }
  }
}
