import { HardDrives } from 'phosphor-react'

interface EmptyProps {
  description: string
}

export function Empty({ description }: EmptyProps) {
  return (
    <div className="h-full flex flex-col items-center max-w-sm mx-auto w-full text-slate-400">
      <HardDrives size={48} weight="duotone" />
      <p className="text-xl">{description}</p>
    </div>
  )
}
