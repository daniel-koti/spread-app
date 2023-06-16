import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { CaretDown, SignOut } from 'phosphor-react'
import {
  CalendarHeart,
  CalendarPlus,
  Tags,
  User,
  WalletIcon,
} from 'lucide-react'

import Link from 'next/link'

export function ProfileLinksMenuButton() {
  const { user, signOut } = useContext(AuthContext)

  const isProducer = user?.type === 'PRODUCER'

  const style = {
    containerUser: 'p-1 rounded-full text-white',
    producer: 'bg-primary-500',
    client: 'bg-blue-500',
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none text-gray-800 hover:text-gray-100 border rounded-full px-4 py-2 hover:bg-primary-500 transition-all ease-in-out">
        <div className="group flex shrink-0 items-center">
          <span
            className={`${style.containerUser} ${
              user?.type === 'PRODUCER' ? style.producer : style.client
            }`}
          >
            <User strokeWidth={1.5} size={18} />
          </span>
          <span className="text-sm ml-2 mr-1 font-medium">{user?.name}</span>
          <CaretDown className="w-2 h-2" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white z-10 flex-col rounded mt-1 overflow-auto shadow-2xl"
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
              <WalletIcon className="h-4 w-4" />
              Minha carteira
            </Link>
          </DropdownMenu.Item>
          {isProducer && (
            <>
              <DropdownMenu.Item className="outline-none" asChild>
                <Link
                  href="/create-event"
                  className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Cadastrar evento
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="outline-none" asChild>
                <Link
                  href="/my-events"
                  className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <CalendarHeart className="h-4 w-4" />
                  Meus eventos
                </Link>
              </DropdownMenu.Item>
            </>
          )}
          {!isProducer && (
            <>
              <DropdownMenu.Item className="outline-none" asChild>
                <Link
                  href="/create-event"
                  className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <Tags className="h-4 w-4" />
                  Meus bilhetes
                </Link>
              </DropdownMenu.Item>
            </>
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
