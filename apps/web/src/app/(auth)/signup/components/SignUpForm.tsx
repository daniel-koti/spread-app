'use client'

import { CheckCircle } from "phosphor-react"
import { useState } from "react"
import { RegisterProducerForm } from "./RegisterProducer"
import { RegisterUserForm } from "./RegisterUser"

export function SignUpForm() {
  const [isProducer, setIsProducer] = useState(true)


  return (
  <>
      <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Criar uma conta de{' '}
              {isProducer ? (
                <strong className="text-orange-500">Organizador</strong>
              ) : (
                <strong className="text-orange-500">Cliente</strong>
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
                  className="block cursor-pointer rounded-[10px] border p-4 text-sm font-medium border-gray-200 hover:border-primary-500  peer-checked:border-orange-500 peer-checked:ring-1 peer-checked:ring-orange-500"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-900">Organizador</p>

                    <CheckCircle
                      weight="fill"
                      className="hidden h-5 w-5 text-orange-500"
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
                  className="block cursor-pointer rounded-[10px] border p-4 text-sm font-medium border-gray-200 hover:border-orange-500 peer-checked:border-orange-500 peer-checked:ring-1 peer-checked:ring-orange-500"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">Cliente</p>

                    <CheckCircle
                      weight="fill"
                      className="hidden h-5 w-5 text-orange-500"
                    />
                  </div>

                  <p className="mt-1 text-gray-400 font-light">
                    Perfil para clientes
                  </p>
                </label>
              </article>
            </div>

            <hr className="my-8" />

            {isProducer ? <RegisterProducerForm /> : <RegisterUserForm />}
   </>
  )
}