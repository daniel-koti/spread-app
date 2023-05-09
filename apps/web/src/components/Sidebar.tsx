import Link from 'next/link'
import {
  Cardholder,
  HouseSimple,
  Power,
  RocketLaunch,
  Ticket,
} from 'phosphor-react'

export function Sidebar() {
  return (
    <aside className="w-20 bg-zinc-800 h-full p-4 text-zinc-500 flex flex-col items-center justify-between">
      <header className="h-8 w-8 flex items-center justify-center bg-gray-950 p-2 rounded-md">
        🦑
      </header>

      <ul className="flex flex-col gap-6">
        <li className="hover:text-zinc-50">
          <Link href="/">
            <HouseSimple size={28} />
          </Link>
        </li>

        <li className="hover:text-zinc-50">
          <Link href="/my-events">
            <RocketLaunch size={28} />
          </Link>
        </li>

        <li className="hover:text-zinc-50">
          <Link href="#">
            <Cardholder size={28} />
          </Link>
        </li>

        <li className="hover:text-zinc-50">
          <Link href="#">
            <Ticket size={28} />
          </Link>
        </li>
      </ul>

      <footer>
        <button className="h-10 w-10 rounded flex items-center justify-center hover:bg-zinc-700 hover:text-zinc-100">
          <Power size={28} />
        </button>
      </footer>
    </aside>
  )
}
