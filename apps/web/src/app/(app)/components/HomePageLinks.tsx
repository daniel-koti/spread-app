'use client'

import { AuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useContext, useEffect } from 'react'

export function HomePageLinks() {
  const { isAuthenticated, user, updateProfile } = useContext(AuthContext)

  useEffect(() => {
    const { '@spread.token': token } = parseCookies()

    if (token) {
      fetch('http://localhost:3333/me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          updateProfile(data.user)
        })
    }
  }, [])

  if (!isAuthenticated) {
    return ''
  }

  return (
    <div className="space-x-3">
      {user?.type === 'PRODUCER' ? (
        <Link
          href="/create-event"
          className="px-8 py-4 border hover:bg-pink-600 hover:text-white hover:border-pink-600"
        >
          Criar evento
        </Link>
      ) : (
        <Link
          href="/my-tickets"
          className="px-8 py-4 border hover:bg-cyan-600 hover:text-white hover:border-cyan-600"
        >
          Meus bilhetes
        </Link>
      )}
    </div>
  )
}
