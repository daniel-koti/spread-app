import { AuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useContext } from 'react'

interface HeroProps {
  username: string
}

export function Hero({ username }: HeroProps) {
  const { user } = useContext(AuthContext)

  return (
    <section className="border-b bg-white">
      <div className="lg:pl-4  grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div className="lg:pr-10 lg:pl-0 pr-4 pl-4 lg:text-left text-center">
          <span className="text-gray-600 text-lg font-medium mb-4 block">
            Bem-vindo, <span className="text-primary-500">{username}</span> 🥳
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

          {user?.type === 'PRODUCER' && (
            <Link
              href="/create-event"
              className="bg-pink-400 mt-5 h-12 px-6 inline-flex items-center justify-center rounded-[10px] text-white hover:bg-pink-500 transition-all ease-in-out"
            >
              + Cadastrar evento
            </Link>
          )}
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
