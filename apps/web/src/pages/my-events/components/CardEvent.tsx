import Image from 'next/image'
import Link from 'next/link'
import { ListBullets, PencilSimpleLine, Question } from 'phosphor-react'

interface CardProps {
  id: string
  image: string
  title: string
  disclosed: Date | null
  category: string
  date: string
  createdAt: string
}

export function CardEvent({
  id,
  title,
  image,
  disclosed,
  date,
  category,
  createdAt,
}: CardProps) {
  return (
    <article className="bg-white flex items-center border-[1px] border-slate-200 rounded-2xl py-5 px-8">
      <div className="w-[30%] text-lg font-semibold flex items-center gap-4">
        {image ? (
          <Image
            src={image}
            alt=""
            height={80}
            width={80}
            className="h-10 object-cover rounded-md"
          />
        ) : (
          <div className="h-10 w-20 bg-slate-400 flex items-center justify-center rounded-md">
            <Question size={24} className="text-white" />
          </div>
        )}

        <strong className="font-semibold text-zinc-900">{title}</strong>
      </div>
      <div className="flex-1 flex gap-4 justify-between items-center">
        {disclosed ? (
          <span className="bg-green-300 text-green-700 px-4 py-1 rounded-xl font-medium text-sm">
            Divulgado
          </span>
        ) : (
          <span className="bg-gray-300 text-gray-700 px-4 py-1 rounded-xl font-medium text-sm">
            Pendente
          </span>
        )}
        <div className="flex flex-col justify-center items-center">
          <strong className="uppercase text-xs text-gray-400">Categoria</strong>
          <span className="text-gray-700 font-medium">{category}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <strong className="uppercase text-xs text-gray-400">
            Data do evento
          </strong>
          <span className="text-gray-700 font-medium">{date}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <strong className="uppercase text-xs text-gray-400">Criado em</strong>
          <span className="text-gray-700 font-medium">{createdAt}</span>
        </div>

        <div className="flex items-center gap-2">
          {disclosed ? (
            <button
              disabled
              className="h-10 w-10 border-[1px] border-gray-100 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:cursor-not-allowed hover:disabled:bg-transparent disabled:opacity-40"
            >
              <PencilSimpleLine size={20} />
            </button>
          ) : (
            <Link
              href={`my-events/update/${id}`}
              className="h-10 w-10 border-[1px] border-gray-100 flex items-center justify-center rounded-md hover:bg-gray-100 disabled:cursor-not-allowed hover:disabled:bg-transparent disabled:opacity-40"
            >
              <PencilSimpleLine size={20} />
            </Link>
          )}

          <Link
            href={`my-events/${id}`}
            className="h-10 w-10 border-[1px] border-gray-100 flex items-center justify-center rounded-md hover:bg-gray-100"
          >
            <ListBullets size={20} />
          </Link>
        </div>
      </div>
    </article>
  )
}
