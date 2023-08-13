import { WrapperDetails } from "./components/WrapperDetails"


interface UpdateEventProps {
  params: {
    id: string
  }
}

export default function MyEventDetails({params}: UpdateEventProps) {
  return (
    <div>
      <div className="px-4">
        <div className="my-8 max-w-5xl w-full  lg:mx-auto bg-white rounded-lg border-[1px] border-slate-200 ">
          <WrapperDetails id={params.id} />
        </div>
      </div>
    </div>
  )
}