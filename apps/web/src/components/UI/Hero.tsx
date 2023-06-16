import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="border-b bg-white">
      <div className="hero lg:pl-4  grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div className="lg:pr-10 lg:pl-0 pr-4 pl-4 lg:text-left text-center">
          <span className="text-gray-600 text-lg font-medium mb-4 block">
            Somos a <span className="text-primary-500">Spread</span> 🥳
          </span>
          <h1 className="text-gray-800 font-bold text-5xl block mb-4">
            Viva experiências únicas nos eventos mais incríveis.
          </h1>
          <p className=" text-slate-700">
            Desde shows, festivais, exposições e muito mais, tudo em um só
            lugar. Encontre seu próximo evento favorito e viva momentos
            inesquecíveis com amigos e familiares. Não perca mais tempo, comece
            a explorar agora mesmo!
          </p>

          <Link
            href="/create-event"
            className="bg-pink-400 mt-4 h-12 border px-6 inline-flex items-center justify-center gap-4 rounded-full hover:bg-pink-500 transition-all ease-in-out"
          >
            Cadastrar evento
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
        <div
          className="w-full h-[480px] bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1508166785545-c2dd4c113c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80')",
          }}
        ></div>
      </div>
    </section>
  )
}
