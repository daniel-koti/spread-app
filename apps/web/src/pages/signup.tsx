import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import asideBackgroundImage from '../assets/spread-tickets.jpg'

import { CheckCircle } from 'phosphor-react'
import { useState } from 'react'
import { CreateProducerForm } from '../components/Pages/CreateProducerForm'
import { CreateUserForm } from '../components/Pages/CreateUserForm'

export default function SignUp() {
  const [isProducer, setIsProducer] = useState(true)

  return (
    <section className="bg-white">
      <Head>
        <title>Criar conta | Spread Events</title>
      </Head>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative bg-blue-50 block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            src={asideBackgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <header className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
              <h1 className="text-5xl font-bold text-primary-500 ">
                SPREAD 🦑
              </h1>

              <span className="text-gray-500">
                Já tem uma conta?{' '}
                <Link href="/signin" className="text-primary-500 underline">
                  Log in
                </Link>
              </span>
            </header>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-5xl">
              Criar uma conta
            </h2>

            <p className="mt-4 leading-relaxed text-gray-500">
              Com a nossa plataforma, você pode criar uma conta e começar a
              divulgar os seus eventos para um público maior.
            </p>

            <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-2">
              <article>
                <input
                  type="radio"
                  name="DeliveryOption"
                  value="DeliveryStandard"
                  id="DeliveryStandard"
                  className="peer hidden [&:checked_+_label_svg]:block"
                  onClick={() => setIsProducer(true)}
                  defaultChecked
                />

                <label
                  htmlFor="DeliveryStandard"
                  className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-primary-500"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900">Organizador</p>

                    <CheckCircle
                      weight="fill"
                      className="hidden h-5 w-5 text-primary-500"
                    />
                  </div>

                  <p className="mt-1 text-gray-400 font-light">
                    Perfil para organizadores de eventos
                  </p>
                </label>
              </article>

              <article>
                <input
                  type="radio"
                  name="DeliveryOption"
                  value="DeliveryPriority"
                  id="DeliveryPriority"
                  className="peer hidden [&:checked_+_label_svg]:block"
                  onClick={() => setIsProducer(false)}
                />

                <label
                  htmlFor="DeliveryPriority"
                  className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-primary-500"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">Cliente</p>

                    <CheckCircle
                      weight="fill"
                      className="hidden h-5 w-5 text-primary-500"
                    />
                  </div>

                  <p className="mt-1 text-gray-400 font-light">
                    Perfil para clientes
                  </p>
                </label>
              </article>
            </div>

            <hr className="my-8" />

            {isProducer ? <CreateProducerForm /> : <CreateUserForm />}
          </div>
        </main>
      </div>
    </section>
  )
}
