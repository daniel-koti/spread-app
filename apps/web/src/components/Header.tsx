import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export function Header() {
  const { user } = useContext(AuthContext)

  return (
    <header className="w-full  flex justify-between">
      <h1 className="text-xl font-bold">SPREAD 🦑</h1>
      <span>{user?.name}</span>
    </header>
  )
}
