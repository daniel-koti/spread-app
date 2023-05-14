import {
  PencilSimpleLine,
  Ticket as TicketIcon,
  Star,
  TrashSimple,
} from 'phosphor-react'

export function Ticket() {
  return (
    <article className="bg-white rounded-[20px] border-[1px] border-slate-300 relative">
      <header className="p-4 border-b-[1px] border-slate-300">
        <TicketIcon size={40} className="text-primary-500" />
      </header>
      <div className="flex flex-col p-4 gap-2 border-b-[1px] border-slate-300">
        <strong className="text-2xl font-semibold text-slate-700">
          5.000,00 kz
        </strong>
        <span className="text-slate-400">VIP</span>
      </div>
      <div className="p-4 flex gap-2">
        <button className="border-none bg-blue-200 p-2 rounded-lg hover:bg-blue-300">
          <PencilSimpleLine size={20} className="text-blue-500" />
        </button>
        <button className="border-none bg-red-200 p-2 rounded-lg hover:bg-red-300">
          <TrashSimple size={20} className="text-red-500" />
        </button>
      </div>
      <div className="h-12 bg-primary-500 w-10 flex justify-center items-center text-white absolute rounded-b-3xl top-0 right-5">
        <Star size={24} weight="duotone" />
      </div>
    </article>
  )
}
