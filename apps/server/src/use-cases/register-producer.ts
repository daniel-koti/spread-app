import { Producer, WalletProducer } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ResourceNotCreatedError } from './errors/resource-not-created-error'
import { ProducerRepository } from '@/repositories/producer-repository'
import { WalletProducerRepository } from '@/repositories/wallet-producer-repository'

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
  walletProducer: WalletProducer
}

export class RegisterProducerUseCase {
  constructor(
    private producerRepository: ProducerRepository,
    private walletProducerRepository: WalletProducerRepository,
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
      throw new ResourceNotFoundError()
    }

    const producer = await this.producerRepository.create({
      name,
      email,
      password: password_hash,
      company,
      nif,
      phone,
    })

    if (!producer) {
      throw new ResourceNotCreatedError()
    }

    const walletProducer = await this.walletProducerRepository.create(
      producer.id,
    )

    return {
      producer,
      walletProducer,
    }
  }
}
