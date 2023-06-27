import Link from 'next/link'
import Image from 'next/image'

import { ProfileLinksMenuButton } from './MenuHeader/ProfileLinksMenuButton'

import logoImage from '../../../assets/logo.svg'

export function Header() {
  return (
    <header className="bg-white border-b w-full">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={logoImage} alt="" />
          </Link>
        </div>

        <ProfileLinksMenuButton />
      </div>
    </header>
  )
}
