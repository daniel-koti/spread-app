import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { parseCookies } from 'nookies'

import { MenuHeader } from './MenuHeader/index'
import { Plus } from 'phosphor-react'

export function Header() {
  const { user } = useContext(AuthContext)
  const { 'spread.isUser': isUser } = parseCookies()

  const isProducer = isUser !== 'true'

  return (
    <header aria-label="Page Header" className="bg-primary-500 ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4 border-b-[1px] border-orange-700 pb-2">
          <div className="relative hidden sm:block">
            <h1 className="text-2xl font-semibold text-white ">SPREAD 🦑</h1>
          </div>

          <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
            {isProducer && (
              <button className="text-sm h-[48px] flex gap-2 items-center shrink-0 px-2 rounded-sm bg-white  text-primary-500 hover:bg-gray-100">
                <Plus className="h-4 w-4" />
                Cadastrar evento
              </button>
            )}

            <MenuHeader />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl">
            Bem-vindo, <span className="text-white">{user?.name}</span>!
          </h1>

          <p className="mt-1.5 text-sm text-gray-50">
            Estamos felizes em tê-lo connosco! 😁
          </p>
        </div>
      </div>
    </header>
  )
}
