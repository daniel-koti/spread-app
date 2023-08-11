'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'

import { AuthContext } from '@/contexts/AuthContext'
import { ChevronDown, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

export function Header() {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)

  return (
    <header className="bg-orange-500 h-16 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt=""
            width={60}
            height={60}
            className="w-10"
          />
        </Link>

        <nav className="space-x-4">
          <Link
            href="/"
            className="text-zinc-50 uppercase text-sm hover:text-orange-100"
          >
            Home
          </Link>
          <Link
            href="/wallet"
            className="text-zinc-50 uppercase text-sm hover:text-orange-100"
          >
            Carteira
          </Link>
          <Link
            href="/my-tickets"
            data-user={user?.type === 'USER'}
            className="text-zinc-50 uppercase text-sm hover:text-orange-100 data-[user=false]:hidden"
          >
            Meus bilhetes
          </Link>
          <Link
            href="/my-events"
            data-producer={user?.type === 'PRODUCER'}
            className="text-zinc-50 uppercase text-sm hover:text-orange-100 data-[producer=false]:hidden"
          >
            Meus eventos
          </Link>
        </nav>
      </div>

      {isAuthenticated ? (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="">
              <div className="flex items-center gap-2 text-white">
                <div className="bg-orange-100/20 rounded-full p-1">
                  <User size={20} className="" />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm">{user?.name}</span>
                  <span className="font-light text-xs">{user?.email}</span>
                </div>

                <ChevronDown size={12} />
              </div>
            </MenubarTrigger>
            <MenubarContent className="min-w-[250px] w-auto rounded-none mr-2 mt-1">
              <header className="flex flex-col items-center gap-2">
                <div className="bg-orange-50 text-orange-600 rounded-full p-1 inline-block">
                  <User size={20} className="" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <strong className="text-sm font-medium text-orange-600">
                    {user?.name}
                  </strong>
                  <span
                    data-user={user?.type === 'USER'}
                    className="text-xs bg-orange-300 px-2 rounded-full data-[user=true]:bg-blue-400"
                  >
                    {user?.type === 'PRODUCER' ? 'Organizador' : 'Cliente'}
                  </span>
                </div>
              </header>
              <MenubarSeparator />
              <MenubarItem>Cadastrar evento</MenubarItem>
              <MenubarItem>Gerir evento</MenubarItem>
              <MenubarItem>Gerir evento</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={signOut}>Sair da plataforma</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <div className="space-x-4">
          <Link href="/signin" className="text-zinc-50 hover:underline text-sm">
            Login
          </Link>
          <Link
            href="#"
            className="bg-white px-5 py-2 text-orange-600 rounded hover:bg-orange-50"
          >
            Criar conta
          </Link>
        </div>
      )}
    </header>
  )
}
