import Image from 'next/image'
import Link from 'next/link'

import { CalendarDays, LayoutGrid, LogOut, Tag, Wallet } from 'lucide-react'
import logoImage from '../../assets/logo.svg'
import { AuthContext, signOut } from '@/contexts/AuthContext'
import { useContext } from 'react'

export function Sidebar() {
  const { user } = useContext(AuthContext)

  return (
    <aside
      className={`md:w-20 w-full md:h-screen h-[72px] ${
        user?.type === 'PRODUCER' ? 'bg-primary-500' : 'bg-blue-900'
      }  px-8  py-8 flex md:flex-col items-center justify-between fixed sticky top-0 left-0 `}
    >
      <Image src={logoImage} width={18} alt="" />

      <ul className="flex md:flex-col gap-6">
        <li className="hover:text-gray-200 text-gray-50">
          <Link href="/">
            <LayoutGrid size={20} />
          </Link>
        </li>

        {user?.type === 'PRODUCER' && (
          <li className="hover:text-gray-200 text-gray-50/40">
            <Link href="/my-events">
              <CalendarDays size={20} />
            </Link>
          </li>
        )}

        <li className="hover:text-gray-200 text-gray-50/40">
          <Link href="/wallet">
            <Wallet size={20} />
          </Link>
        </li>

        {user?.type === 'USER' && (
          <li className="hover:text-gray-200 text-gray-50/30">
            <Link href="/my-tickets">
              <Tag size={20} />
            </Link>
          </li>
        )}
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
