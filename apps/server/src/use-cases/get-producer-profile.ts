import { ProducersRepository } from '@/repositories/producers-repository'
import { Producer } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetProducerProfileUseCaseRequest {
  producerId: string
}

interface GetProducerProfileUseCaseResponse {
  producer: Producer
}

export class GetProducerProfileUseCase {
  constructor(private producersRepository: ProducersRepository) {}

  async execute({
    producerId,
  }: GetProducerProfileUseCaseRequest): Promise<GetProducerProfileUseCaseResponse> {
    const producer = await this.producersRepository.findById(producerId)

    if (!producer) {
      throw new ResourceNotFoundError()
    }

    return {
      producer,
    }
  }
}
