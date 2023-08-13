'use client'

import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { Clock, MapPin } from 'lucide-react'
import { parseCookies } from 'nookies'

const updateEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().nullable(),
  categoryId: z.string(),
  dateStart: z.string(),
  dateEnd: z.string(),
  hourStart: z.string().nullable(),
  hourEnd: z.string().nullable(),
  ticketsQtd: z.string().nullable(),
  type: z.enum(['ONLINE', 'PERSON']),
  address: z.string(),
})


type UpdateNewEventInput = z.infer<typeof updateEventSchema>

interface Event {
  id: string
  title: string
  description: string
  image: string
  address: string
  category_id: string
  date_start: Date
  date_end: Date
  tickets_qtd: number
  hour_start: string
  hour_end: string
  disclosed: Date | null
  type: 'ONLINE' | 'PERSON'
  created_at: Date
  producer_id?: string
}

interface Category {
  id: string
  name: string
}

interface FormUpdateEventProps {
  event: Event
  categories: Category[]
}

export function FormUpdateEvent({event, categories}: FormUpdateEventProps) {
  const router = useRouter()

  const [selectedImages, setSelectedImages] = useState<any>([])
  const [imageBase64File, setImageBase64File] = useState<String | null>(null)
  const currentDate = new Date().toISOString().split('T')[0]

  const [hasImage, setHasImage] = useState(!!event.image)

  const { register, handleSubmit, watch } = useForm<UpdateNewEventInput>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      title: event?.title,
      description: event?.description,
      image: event?.image,
      categoryId: event?.category_id,
      ticketsQtd: String(event.tickets_qtd),
      dateStart: event?.date_start.toString().split('T')[0],
      dateEnd: event?.date_end.toString().split('T')[0],
      hourStart: event?.hour_start,
      hourEnd: event?.hour_end,
      type: event?.type,
      address: event?.address,
    },
  })

  const typeEvent = watch('type')
  const dateStart = watch('dateStart')

  async function handleUpdateEvent(data: UpdateNewEventInput) {
    const newEvent = {
      id: event?.id,
      title: data.title,
      description: data.description,
      image: imageBase64File || event.image,
      category_id: data.categoryId,
      date_start: new Date(data.dateStart),
      date_end: new Date(data.dateEnd),
      hour_start: data.hourStart,
      hour_end: data.hourEnd,
      tickets_qtd: Number(data.ticketsQtd),
      type: data.type,
      address: data.address,
      disclosed: null,
      created_at: event?.created_at,
      producer: event?.producer_id,
    }

    try {
      const { '@spread.token': token } = parseCookies()

      const response = await fetch('http://localhost:3333/event/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(newEvent),
    })

    if (response.ok) {
      handleRemoveImage()
      toast.success('Evento atualizado com sucesso!')
      router.push('/my-events')
    }
      
    } catch (err) {
      toast.error('Não foi possível atualizar o evento')
    }
  }

  function handleRemoveImage() {
    setSelectedImages([])
    setImageBase64File(null)
  }

  const convertFileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {
        if (reader.result) {
          const base64String = reader.result?.toString()
          resolve(base64String)
        } else {
          reject(new Error('Erro ao converter o arquivo para base64'))
        }
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  async function onSelectImage(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files!
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })

    const base64File = await convertFileToBase64(selectedFiles[0])

    setImageBase64File(String(base64File))
    setSelectedImages(imagesArray)

    event.target.value = ''
  }

  return (
    <div>
     
      <div className="px-4">
        <div className="my-8 bg-white rounded-lg border-[1px] border-slate-200 max-w-4xl mx-auto">
          <form className="p-8" onSubmit={handleSubmit(handleUpdateEvent)}>
            <header className="my-6">
              <span className="text-slate-800 text-2xl font-medium">
                Dados Básicos
              </span>
              <hr className="my-4 text-slate-100" />
            </header>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-3">
                <label
                  htmlFor="title"
                  className="text-sm text-slate-500 block "
                >
                  Título
                </label>
                <input
                  {...register('title')}
                  type="text"
                  id="title"
                  className="bg-slate-50 w-full flex items-center rounded-[10px] h-12 border-[1px] border-slate-300 px-4 outline-primary-500 text-slate-700 text-base"
                />
              </div>

              <div className="flex flex-col items-start gap-3">
                <label htmlFor="description" className="text-sm text-slate-500">
                  Descrição do evento
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  rows={5}
                  className="w-full flex items-center py-2 bg-slate-50 rounded-[10px] border-[1px] outline-primary-500 border-slate-300 px-4 text-slate-700 text-base resize-none"
                />
              </div>

              {hasImage ? (
                <div>
                  <Image
                    src={event.image}
                    width={800}
                    height={288}
                    alt=""
                    className="w-full h-72 object-cover rounded-[10px] px-[1px] py-[3x]"
                  />

                  <button
                    type="button"
                    className="bg-red-200 text-red-700 my-4 px-8 py-2 rounded hover:bg-red-300"
                    onClick={() => setHasImage(false)}
                  >
                    Apagar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-3">
                  <label
                    htmlFor="image"
                    className="flex flex-col justify-center items-center  bg-slate-50  border-slate-300 h-72 w-full cursor-pointer rounded-[10px] hover:border-primary-500"
                  >
                    <input
                      type="file"
                      className="hidden"
                      id="image"
                      multiple
                      accept="image/*"
                      onChange={onSelectImage}
                    />

                    <div className=" w-full h-full rounded-[10px] border-1 border-slate-300 border-2 border-dashed flex items-center justify-center">
                      {selectedImages.length > 0 ? (
                        selectedImages.map((image, index) => {
                          return (
                            <Image
                              key={image}
                              src={image}
                              width={800}
                              height={288}
                              alt=""
                              className="h-72 w-full object-cover rounded-[10px] px-[1px] py-[3px]"
                            />
                          )
                        })
                      ) : (
                        <span className="text-primary-500">
                          + Adicionar uma foto
                        </span>
                      )}
                    </div>
                  </label>

                  <div>
                    {selectedImages &&
                      selectedImages.map((image, index) => {
                        return (
                          <div key={index}>
                            <button
                              onClick={handleRemoveImage}
                              className="bg-red-200 text-red-700 my-4 px-8 py-2 rounded hover:bg-red-300"
                            >
                              Apagar fotografia
                            </button>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="flex flex-col gap-2 items-start">
                  <label htmlFor="category" className="text-sm text-slate-500">
                    Categoria do evento
                  </label>
                  <select
                    {...register('categoryId')}
                    id="category"
                    className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm"
                  >
                    {categories?.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <label htmlFor="tickets" className="text-sm text-slate-500">
                    Quantidade de bilhetes
                  </label>
                  <input
                    {...register('ticketsQtd')}
                    id="tickets"
                    type="number"
                    min={10}
                    className="bg-slate-50 w-full h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none"
                  />
                </div>
              </div>

              <div className="my-6">
                <span className="flex items-center gap-4 text-slate-800 text-2xl font-medium">
                  Horário <Clock />
                </span>
                <hr className="my-4 text-slate-100" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="date_start"
                    className="text-sm text-slate-500"
                  >
                    Data inicial
                  </label>
                  <input
                    {...register('dateStart')}
                    id="date_start"
                    type="date"
                    min={currentDate}
                    className="bg-slate-50 h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="date_end" className="text-sm text-slate-500">
                    Data final
                  </label>
                  <input
                    {...register('dateEnd')}
                    disabled={!dateStart}
                    id="date_end"
                    type="date"
                    min={dateStart}
                    className="bg-slate-50 h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none disabled:text-zinc-300 disabled:border-zinc-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="hour_start"
                      className="text-sm text-slate-500"
                    >
                      Hora inicial
                    </label>
                    <input
                      {...register('hourStart')}
                      id="hour_start"
                      type="time"
                      className="bg-slate-50 h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="hour_end"
                      className="text-sm text-slate-500"
                    >
                      Hora final
                    </label>
                    <input
                      {...register('hourEnd')}
                      id="hour_end"
                      type="time"
                      className="bg-slate-50 h-12 rounded-[10px] border border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              <header className="my-6">
                <span className="flex items-center gap-4 text-slate-800 text-2xl font-medium">
                  Endereço <MapPin />
                </span>
                <hr className="my-4 text-slate-100" />
              </header>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 items-start">
                  <label htmlFor="type" className="text-sm text-slate-500">
                    Tipo de evento
                  </label>
                  <select
                    {...register('type')}
                    id="type"
                    className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm"
                  >
                    <option value="PERSON">Presencial</option>
                    <option value="ONLINE">Online</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-2 items-start">
                  <label htmlFor="address" className="text-sm text-slate-500">
                    Endereço {typeEvent === 'ONLINE' && '(URL)'}
                  </label>
                  <input
                    {...register('address')}
                    id="address"
                    type={`${typeEvent === 'ONLINE' ? 'url' : 'text'}`}
                    className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 px-4 outline-primary-500 text-slate-700 text-sm"
                    placeholder={`${
                      typeEvent === 'ONLINE' ? 'https://' : 'Localização'
                    }`}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 w-full mt-4 hover:bg-green-700 py-3 rounded-[10px] text-zinc-100 font-medium"
            >
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}