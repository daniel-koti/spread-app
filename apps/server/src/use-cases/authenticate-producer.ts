import { ProducersRepository } from '@/repositories/producers-repository'
import { Producer } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateProducerUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateProducerUseCaseResponse {
  producer: Producer
}

export class AuthenticateProducerUseCase {
  constructor(private producersRepository: ProducersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateProducerUseCaseRequest): Promise<AuthenticateProducerUseCaseResponse> {
    const producer = await this.producersRepository.findByEmail(email)

    if (!producer) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatch = await compare(password, producer.password_hash)

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      producer,
    }
  }
}
