import { UsersRepository } from '@/repositories/users-repository'
import { User, Wallet } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ResourceNotCreatedError } from './errors/resource-not-created-error'
import { WalletUserRepository } from '@/repositories/wallet-user-repository'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
  wallet: Wallet
}

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private walletRepository: WalletUserRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    if (!user) {
      throw new ResourceNotCreatedError()
    }

    const wallet = await this.walletRepository.create(user.id)

    return {
      user,
      wallet,
    }
  }
}
