import { CheckCircle } from 'phosphor-react'

interface BadgeProps {
  status: 'success' | 'error' | 'warning'
  description: string
}

export function Badge({ status, description }: BadgeProps) {
  return (
    <span className="flex items-center justify-center gap-1 rounded-full font-medium bg-emerald-100 px-4 py-0.5 text-emerald-700">
      <CheckCircle />
      <p className="whitespace-nowrap">{description}</p>
    </span>
  )
}