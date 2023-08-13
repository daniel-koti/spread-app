import dayjs from 'dayjs'
import Link from 'next/link'
import Image from 'next/image'

interface EventCardProps {
  id: string
  title: string
  image: string | null
  description: string
  type: 'PERSON' | 'ONLINE'
  date: Date
  disclosed: Date | null
}

export function EventCard({
  id,
  date,
  image,
  title,
  description,
}: EventCardProps) {
  const monthFormatted = dayjs(date).format('MMM')
  const dayNumber = dayjs(date).format('DD')

  return (
    <Link
      href={`event/${id}`}
      className="bg-zinc-50 shadow-md rounded pb-6 h-72"
    >
      <header className="w-full">
        {image ? (
          <Image
            className="w-full h-[180px] object-cover rounded-t"
            src={image}
            alt=""
            width={400}
            height={200}
          />
        ) : (
          <div className="w-full flex items-center justify-center h-[180px] bg-slate-400 rounded-t">
            <h2 className="text-zinc-50">Sem imagem</h2>
          </div>
        )}
      </header>
      <section className="mt-4 px-5">
        <div className="flex items-start gap-4">
          <div className="flex flex-col text-center">
            <span className="text-sm font-medium text-primary-500">
              {monthFormatted}
            </span>
            <strong className="text-2xl text-orange-600">{dayNumber}</strong>
          </div>
          <div className="flex flex-col gap-1">
            <strong className="font-semibold text-slate-900 text-sm">
              {title}
            </strong>
            <span className="text-xs text-slate-400 description-wrapper">
              {description}
            </span>
          </div>
        </div>
      </section>
    </Link>
  )
}
