import Link from 'next/link'
import { ProfileLinksMenuButton } from './MenuHeader/ProfileLinksMenuButton'

export function Header() {
  return (
    <header aria-label="Site Header" className="border-b border-gray-300">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex font-medium text-2xl text-primary-500">
            SPREAD 🦑
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-8">
          <nav
            aria-label="Site Nav"
            className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500"
          >
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
          </nav>

          <div className="flex items-center">
            <div className="flex items-center border-x border-gray-300">
              <span className="px-2">
                <ProfileLinksMenuButton />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
