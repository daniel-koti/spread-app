import Image from 'next/image'
import partyImg from '../assets/sign-in.avif'

export function Hero() {
  return (
    <section className="bg-primary-500/70 rounded-xl mt-4 grid grid-cols-2">
      <div className="p-6"></div>
      <Image src={partyImg} alt="" className="rounded-tr-xl rounded-br-xl" />
    </section>
  )
}
