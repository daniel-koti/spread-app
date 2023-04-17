import { Producer } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { ProducersRepository } from '@/repositories/producers-repository'

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
  constructor(private producerRepository: ProducersRepository) {}

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
      password_hash,
      company,
      nif,
      phone,
    })

    return {
      producer,
    }
  }
}
