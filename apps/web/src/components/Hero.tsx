import Image from 'next/image'
import womansSmilingImage from '../assets/womans-smiling.png'

export function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center px-4 bg-orange-100 rounded-xl">
      <h1 className="text-xl lg:text-5xl font-medium w-[420px]">
        Explore novos eventos numa única plataforma
      </h1>

      <div className="flex-1 flex justify-end">
        <Image
          className=""
          src={womansSmilingImage}
          alt="Duas mulheres negras sorrindo"
          height={400}
          width={700}
        />
      </div>
    </section>
  )
}
