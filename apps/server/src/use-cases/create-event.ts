import { EventsRepository } from '@/repositories/events-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { NotAuthorizedError } from './errors/not-authorized'

interface CreateEventUseCaseRequest {
  title: string
  description: string
  address: string
  category_id: string
  date_start: Date
  date_end: Date
  hour_start: string
  tickets_qtd: number
  hour_end: string
  type: 'ONLINE' | 'PERSON'
  user_id: string
  image: string | null
}

export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    description,
    address,
    category_id,
    date_start,
    date_end,
    hour_start,
    hour_end,
    type,
    user_id,
    image,
    tickets_qtd,
  }: CreateEventUseCaseRequest) {
    const isProducer = await this.usersRepository.findById(user_id)

    if (!isProducer) {
      throw new NotAuthorizedError()
    }

    const event = await this.eventsRepository.create({
      title,
      description,
      address,
      category_id,
      date_start,
      date_end,
      hour_start,
      hour_end,
      type,
      user_id,
      tickets_qtd,
      image,
    })

    return {
      event,
    }
  }
}
