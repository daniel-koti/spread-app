import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { CaretDown, Plus, SignOut, User } from 'phosphor-react'
import { parseCookies } from 'nookies'

import Link from 'next/link'

export function ProfileLinksMenuButton() {
  const { user, signOut } = useContext(AuthContext)

  const { 'spread.isUser': isUser } = parseCookies()

  const isProducer = isUser !== 'true'

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none">
        <div className="group flex shrink-0 items-center gap-2 transition pr-4 pl-2 py-1 border-[1px] border-zinc-400 rounded-full">
          <span className="sr-only">Menu</span>

          <span
            className={`${
              isProducer ? 'bg-primary-500' : 'bg-blue-500'
            } p-2 rounded-full text-zinc-200`}
          >
            <User />
          </span>
          <span className="text-gray-200 text-sm">{user?.email}</span>
          <CaretDown className="w-2 h-2 text-white" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white z-10 flex-col rounded-lg overflow-auto shadow-md"
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
          {isProducer && (
            <DropdownMenu.Item className="outline-none" asChild>
              <Link
                href="/events/create"
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
