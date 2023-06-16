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
    <section className="h-full">
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

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
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

            <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Criar uma conta de{' '}
              {isProducer ? (
                <strong className="text-primary-500">Organizador</strong>
              ) : (
                <strong className="text-primary-500">Cliente</strong>
              )}
            </h2>

            {isProducer ? (
              <p className="mt-4 leading-relaxed text-gray-500">
                Como organizador poderá criar e gerenciar os seus eventos por
                meio da nossa plataforma. Garantimos o controle dos seus
                bilhetes e exposição do evento para diferentes pessoas.
              </p>
            ) : (
              <p className="mt-4 leading-relaxed text-gray-500">
                Seja nosso cliente e receba anúncios de eventos em primeira mão.
                Garantimos a vericidade dos eventos e deixamos-lhe mais próximo
                dos organizadores.
              </p>
            )}

            <div className="my-8 grid grid-cols-2 gap-2">
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
                  className="block cursor-pointer rounded-[10px] border p-4 text-sm font-medium border-gray-200 hover:border-primary-500  peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-primary-500"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900">Organizador</p>

                    <CheckCircle
                      weight="fill"
                      className="hidden h-5 w-5 text-primary-500"
                    />
                  </div>

                  <p className="mt-1 text-gray-400 font-light">
                    Perfil para organizadores
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
                  className="block cursor-pointer rounded-[10px] border p-4 text-sm font-medium border-gray-200 hover:border-primary-500 peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-primary-500"
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
