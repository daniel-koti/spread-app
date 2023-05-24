import empty from '../../assets/empty.svg'
import Image from 'next/image'

interface EmptyProps {
  description: string
}

export function Empty({ description }: EmptyProps) {
  return (
    <div className="h-full flex flex-col items-center max-w-sm mx-auto w-full text-slate-400">
      <Image src={empty} alt="" />
      <p className="text-xl">{description}</p>
    </div>
  )
}
