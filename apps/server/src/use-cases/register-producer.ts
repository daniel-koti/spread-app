import { Producer } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ProducersRepository } from '@/repositories/producers-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

import { WalletsRepository } from '@/repositories/wallets-repository'

interface RegisterProducerUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  nif: string
  company: boolean
}

interface RegisterProducerUseCaseResponse {
  producer: Producer
}

export class RegisterProducerUseCase {
  constructor(
    private producerRepository: ProducersRepository,
    private walletsRepository: WalletsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    company,
    nif,
    phone,
  }: RegisterProducerUseCaseRequest): Promise<RegisterProducerUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const producerWithSameEmail = await this.producerRepository.findByEmail(
      email,
    )

    if (producerWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const wallet = await this.walletsRepository.create()

    const producer = await this.producerRepository.create({
      name,
      email,
      password_hash,
      company,
      nif,
      phone,
      wallet_id: wallet.id,
    })

    return {
      producer,
    }
  }
}
