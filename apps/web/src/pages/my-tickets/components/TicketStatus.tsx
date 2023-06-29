interface TicketStatusProps {
  status: 'VALID' | 'INVALID' | 'USED' | 'EXPIRED'
}

export function TicketStatus({ status }: TicketStatusProps) {
  return (
    <>
      {status === 'VALID' ? (
        <strong className="text-sm bg-green-200 border border-green-700 rounded-full px-2 py-1 text-green-600">
          Válido
        </strong>
      ) : status === 'INVALID' ? (
        <strong className="text-sm bg-orange-200 border border-orange-700 rounded-full px-2 py-1 text-orange-600">
          Inválido
        </strong>
      ) : status === 'USED' ? (
        <strong className="text-sm bg-gray-200 border border-gray-700 rounded-full px-2 py-1 text-gray-600">
          Usado
        </strong>
      ) : status === 'EXPIRED' ? (
        <strong className="text-sm bg-purple-200 border border-purple-700 rounded-full px-2 py-1 text-purple-600">
          Expirado
        </strong>
      ) : (
        <strong className="text-sm bg-gray-200 border border-gray-700 rounded-full px-2 py-1 text-gray-600">
          Desconhecido
        </strong>
      )}
    </>
  )
}
