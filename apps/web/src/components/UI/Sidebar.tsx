'use client'

import { ReactNode, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { CalendarDays, LayoutGrid, LogOut, Tag, Wallet } from 'lucide-react'
import { AuthContext, signOut } from '@/contexts/AuthContext'
import logoImage from '../../assets/logo.svg'

interface NavLinks {
  href: any
  icon: ReactNode
  permission: 'PRODUCER' | 'USER' | 'BOTH'
}

const navLinks: NavLinks[] = [
  {
    href: '/',
    icon: <LayoutGrid size={20} />,
    permission: 'BOTH',
  },
  {
    href: '/my-events',
    icon: <CalendarDays size={20} />,
    permission: 'PRODUCER',
  },
  {
    href: '/wallet',
    icon: <Wallet size={20} />,
    permission: 'BOTH',
  },
  {
    href: '/my-tickets',
    icon: <Tag size={20} />,
    permission: 'USER',
  },
]

export function Sidebar() {
  const { user } = useContext(AuthContext)
  const pathname = usePathname()

  return (
    <aside
      className={`md:w-20 w-full md:h-screen h-[72px] ${
        user?.type === 'PRODUCER' ? 'bg-primary-500' : 'bg-blue-900'
      }  px-8  py-8 flex md:flex-col items-center justify-between fixed sticky top-0 left-0 `}
    >
      <Image src={logoImage} width={18} alt="" />

      <ul className="flex md:flex-col gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          const canShow =
            link.permission === 'BOTH' || link.permission === user?.type

          return (
            canShow && (
              <li
                className={`hover:text-gray-200 ${
                  isActive ? 'text-gray-200' : 'text-gray-50/40'
                } `}
                key={link.href}
              >
                <Link href={link.href}>{link.icon}</Link>
              </li>
            )
          )
        })}
      </ul>

      <footer>
        <button
          onClick={() => signOut()}
          className="h-10 w-10 rounded flex items-center justify-center  hover:text-gray-200 text-gray-50"
        >
          <LogOut size={20} />
        </button>
      </footer>
    </aside>
  )
}
