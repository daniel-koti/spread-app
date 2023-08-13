import { UpdateEvent } from "./components/UpdateEvent"

interface UpdateEventProps {
  params: {
    id: string
  }
}

export default function Update({params}: UpdateEventProps) {
  return (
    <div>
      <div className="px-4">
        <div className="my-8 max-w-5xl w-full  lg:mx-auto bg-white rounded-lg border-[1px] border-slate-200 ">
          <div className="bg-gradient-to-r from-orange-50 to-white p-8 rounded-t-lg border-b border-slate-200">
            <h1 className="text-4xl text-orange-500 font-semibold">
              Atualizar evento
            </h1>
          </div>          
            <UpdateEvent id={params.id} />
        </div>
      </div>
    </div>
  )
}