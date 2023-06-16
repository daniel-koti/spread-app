import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ProfileLinksMenuButton } from './MenuHeader/ProfileLinksMenuButton'

import logoImage from '../../../assets/logo.svg'

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={logoImage} alt="" />
          </Link>
        </div>

        <ProfileLinksMenuButton />

        {/* <div className="flex flex-1 items-center justify-end gap-8">
          <nav className="hidden lg:flex lg:gap-4 font-medium  lg:tracking-wide lg:text-gray-500">
            {!isProducer && (
              <Link
                href="/my-tickets"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-primary-500"
              >
                Meus bilhetes
              </Link>
            )}

            {isProducer && (
              <>
                <Link
                  href="/create-event"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-primary-500"
                >
                  Criar evento
                </Link>
                <Link
                  href="/my-events"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-primary-500"
                >
                  Meus eventos
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center">
            <div className="flex items-center border-x border-gray-300">
              <span className="px-2">
                <ProfileLinksMenuButton />
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </header>
  )
}
