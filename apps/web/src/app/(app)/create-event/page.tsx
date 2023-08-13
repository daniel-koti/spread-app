import { Suspense } from "react";
import { NewEvent } from "./components/NewEvent";
import { SkeletonForm } from "./components/SkeletonForm";


export default function CreateEvent() {
  return (
    <div>
      <div className="px-4">
        <div className="my-8 max-w-5xl w-full  lg:mx-auto bg-white rounded-lg border-[1px] border-slate-200 ">
          <div className="bg-gradient-to-r from-green-50 to-white p-8 rounded-t-lg border-b border-slate-200">
            <h1 className="text-4xl text-green-500 font-semibold">
              Criar um evento
            </h1>
          </div>

          <Suspense fallback={<SkeletonForm />}>
            <NewEvent />
          </Suspense>
          
        </div>
      </div>
    </div>
  )
}