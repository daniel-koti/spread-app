import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { CaretDown, Plus, SignOut, User, Wallet } from 'phosphor-react'
import { parseCookies } from 'nookies'

import Link from 'next/link'

export function ProfileLinksMenuButton() {
  const { user, signOut, typeUser } = useContext(AuthContext)

  const { 'spread.isUser': isUser } = parseCookies()

  const isProducer = isUser !== 'true'

  const style = {
    containerUser: 'p-2 rounded-full text-zinc-200',
    producer: 'bg-primary-500',
    client: 'bg-blue-500',
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none">
        <div className="group bg-slate-100 flex shrink-0 items-center gap-2 transition pr-4 pl-2 py-1 rounded-full">
          <span className="sr-only">Menu</span>

          <span
            className={`${style.containerUser} ${
              typeUser === 'producer' ? style.producer : style.client
            }`}
          >
            <User />
          </span>
          <span className="text-gray-900 text-sm">{user?.email}</span>
          <CaretDown className="w-4 h-4 text-zinc-500" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white z-10 flex-col rounded-lg overflow-auto shadow-2xl"
          sideOffset={5}
        >
          <DropdownMenu.Item className="outline-none">
            <div className="flex flex-col items-center gap-2 text-sm px-4 py-8 border-b-[1px] border-zinc-400">
              <div className="flex flex-col text-center">
                <span className="text-sm">{user?.name}</span>
                <span className="text-xs">{user?.email}</span>
              </div>

              {isProducer ? (
                <span className="bg-primary-500 p-1 px-4 rounded-full text-xs text-zinc-100">
                  Organizador
                </span>
              ) : (
                <span className="bg-blue-500 p-1 px-4 rounded-full text-xs text-zinc-100">
                  Cliente
                </span>
              )}
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="outline-none" asChild>
            <Link
              href="/wallet"
              className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <Wallet weight="bold" />
              Minha carteira
            </Link>
          </DropdownMenu.Item>
          {isProducer && (
            <DropdownMenu.Item className="outline-none" asChild>
              <Link
                href="/create-event"
                className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <Plus weight="bold" />
                Cadastrar evento
              </Link>
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Item className="outline-none" asChild>
            <span
              onClick={signOut}
              className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <SignOut weight="bold" />
              Sair da plataforma
            </span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.Arrow className="fill-primary-500" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
