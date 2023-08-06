import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateAdminCaseRequest {
  email: string
  password: string
}

interface AuthenticateAdminUseCaseResponse {
  admin: User
}

export class AuthenticateAdminCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateAdminCaseRequest): Promise<AuthenticateAdminUseCaseResponse> {
    const admin = await this.usersRepository.findByEmail(email)

    if (!admin) {
      throw new InvalidCredentialsError()
    }

    if (admin.type !== 'ADMIN') {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatch = await compare(password, admin.password_hash)

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      admin,
    }
  }
}
