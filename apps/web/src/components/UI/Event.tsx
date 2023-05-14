import Link from 'next/link'
import Image from 'next/image'
import { PencilSimpleLine, PersonSimple, Trash } from 'phosphor-react'

interface EventProps {
  id: string
  title: string
  imageUrl: string | null
  type: 'person' | 'online'
  date: Date
  disclosed: Date | null
  isEdit: boolean
}

export function Event({
  id,
  date,
  imageUrl,
  title,
  type,
  isEdit,
  disclosed,
}: EventProps) {
  return (
    <Link
      href={isEdit ? `my-events/${id}` : '#'}
      className="bg-zinc-50 shadow-md rounded-xl pb-6 relative"
    >
      <header className="w-full">
        {imageUrl ? (
          <Image
            className="w-full object-cover rounded-t-xl"
            src={imageUrl}
            alt=""
            width={400}
            height={200}
          />
        ) : (
          <div className="w-full flex items-center justify-center h-[196px] bg-slate-400 rounded-t-xl">
            <h2 className="text-zinc-50">Sem imagem</h2>
          </div>
        )}
      </header>
      <section className="mt-4 px-5">
        <div className="flex flex-col gap-1">
          <strong className="font-medium text-slate-900 text-lg">
            {title}
          </strong>
          <span className="text-sm text-slate-400">29 de Dezembro, 2023</span>
        </div>
      </section>

      {!isEdit ? (
        <footer className="absolute top-[-16px] right-4 h-12 bg-primary-500 flex items-center justify-center w-10 rounded-md">
          <PersonSimple size={20} weight="duotone" className="text-white" />
        </footer>
      ) : (
        <footer className="flex items-center gap-1 absolute top-2 right-6">
          <button className="h-10 w-10 flex justify-center items-center bg-slate-100 border-[1px] border-gray-200 text-slate-800 rounded-l-xl hover:bg-slate-200">
            <PencilSimpleLine size={20} />
          </button>
          {!disclosed && (
            <button className="h-10 w-10 flex justify-center items-center bg-slate-50 border-[1px] border-gray-200 text-slate-800 rounded-r-xl hover:bg-slate-200">
              <Trash size={20} />
            </button>
          )}
        </footer>
      )}
    </Link>
  )
}
