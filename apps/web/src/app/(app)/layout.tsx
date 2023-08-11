import { ReactNode } from 'react'
import { Header } from '@/components/Header'

export default async function AppLayout({ children }: { children: ReactNode }) {
  // Validar estado de autenticação
  // Enviar valores do utilizador logado

  return (
    <div className="">
      <Header />
      {children}
    </div>
  )
}
