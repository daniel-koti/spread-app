import Image from 'next/image'

import { Events } from './components/Events'
import { Suspense } from 'react'
import { SkeletonEvents } from './components/SkeletonEvents'
import { HomePageLinks } from './components/HomePageLinks'

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-8 px-8 relative py-16 min-h-[calc(80vh-64px)] bg-no-repeat bg-cover bg-center bg-[url('/frame.png')]">
        <div className="space-y-6">
          <strong className="uppercase text-sm text-orange-600 bg-orange-100 inline-block px-6 py-4 rounded-full">
            Gerencie os seus eventos.
          </strong>
          <h1 className="text-6xl font-semibold text-zinc-900 block">
            Encontre os{' '}
            <span className="text-orange-600">melhores eventos</span> de maneira
            rápida.
          </h1>
          <p className="text-zinc-600 font-normal ">
            Seja como organizador ou cliente, mantenha os seus eventos e tickets
            organizados e acessíveis a distância de um click.
          </p>

          <HomePageLinks />
        </div>

        <div className="relative w-[80%] lg:mr-4 border-2 border-dashed border-orange-300 pl-8">
          <Image
            src="/girl-sing.jpg"
            alt=""
            width={500}
            height={500}
            className="object-cover w-full h-full absolute top-[-40px] rounded-tl-[80px] rounded-br-[80px]"
          />
        </div>
      </div>

      <Suspense fallback={<SkeletonEvents />}>
        <Events />
      </Suspense>
    </>
  )
}
