import dayjs from 'dayjs'
import { TicketStatus } from './TicketStatus'

interface TicketProps {
  reference: string
  createdAt: Date
  status: 'VALID' | 'INVALID' | 'USED' | 'EXPIRED'
  type: string
  event: string
}

export function Ticket({
  createdAt,
  event,
  reference,
  status,
  type,
}: TicketProps) {
  return (
    <div className="group relative rounded overflow-hidden">
      <header className="bg-blue-950 text-white h-48 flex justify-center items-center">
        <strong className="text-4xl uppercase">#{reference}</strong>
      </header>
      <div className="bg-white p-4 flex flex-col gap-2">
        <div>
          <strong className="text-sm font-semibold">{event}</strong>
        </div>
        <div>
          <span className="text-sm">Bilhete: </span>
          <span className="text-sm font-medium text-orange-600">{type}</span>
        </div>
        <div className="">
          <span className="text-sm">Comprado em: </span>
          <span className="text-sm text-gray-500 font-medium">
            {dayjs(createdAt).format('DD [de] MMMM [de] YYYY')}
          </span>
        </div>
        <TicketStatus status={status} />
      </div>
    </div>
  )
}
