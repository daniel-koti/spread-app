import { Metadata } from 'next'
import { Music } from 'lucide-react'
import { SignUpForm } from './components/SignUpForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Spread | Criar conta',
  description: 'Página de Login',
}

export default function SignUp() {
  return (
    <section className="grid grid-cols-2 h-screen lg:items-center ">
      <aside className="col-span-1 h-full w-full flex items-center justify-center bg-repeat bg-cover bg-center bg-[url('/frame-2.png')]">
        <div className="bg-zinc-50/30 border rounded border-zinc-50/30 px-12 pb-36 pt-12 mx-20 space-y-6">
          <Music size={48} className="text-zinc-50" />
          <h1 className="text-5xl font-semibold text-zinc-50">
            Plataforma digital para divulgação de{' '}
            <span className="text-sky-950">eventos.</span>
          </h1>
          <p className="text-zinc-50">
            Descubra os melhores eventos e garanta os seus bilhetes com apenas
            alguns cliques.
          </p>
        </div>
      </aside>
      <aside className="col-span-1 h-full flex items-center px-20 bg-white">
        <div className="w-full">
          <header className="mb-10 space-y-4">
            <p className="text-zinc-700">
              Já tem uma conta? <Link href="/signin" className="text-orange-500 underline">
                  Log in
                </Link>
            </p>
          </header>

          <SignUpForm />
        </div>
      </aside>
    </section>
  )
}
