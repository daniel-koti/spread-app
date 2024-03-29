'use client'

import { ChangeEvent, useState } from "react"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "react-toastify"
import { Clock, MapPin } from "lucide-react"
import { parseCookies } from "nookies"

interface FormCreateEventProps {
  categories?: {
    id: string
    name: string
  }[]
}

const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  categoryId: z.string(),
  ticketsQtd: z.string(),
  dateStart: z.string(),
  dateEnd: z.string(),
  hourStart: z.string().nullable(),
  hourEnd: z.string().nullable(),
  type: z.enum(['ONLINE', 'PERSON']),
  address: z.string(),
})

type CreateNewEventInput = z.infer<typeof createEventSchema>

export function FormCreateEvent({categories}: FormCreateEventProps) {
  const [selectedImages, setSelectedImages] = useState<any>([])
  const [imageBase64File, setImageBase64File] = useState<String | null>(null)

  const { register, handleSubmit, reset, watch } = useForm<CreateNewEventInput>(
    {
      resolver: zodResolver(createEventSchema),
      defaultValues: {
        type: 'PERSON',
      },
    },
  )

  const typeEvent = watch('type')
  const dateStart = watch('dateStart')
  const currentDate = new Date().toISOString().split('T')[0] // 2023-05-17

  function handleRemoveImage() {
    setSelectedImages([])
    setImageBase64File(null)
  }


  async function handleCreateEvent(data: CreateNewEventInput) {
    const {
      title,
      description,
      address,
      categoryId,
      dateEnd,
      dateStart,
      hourEnd,
      hourStart,
      type,
      ticketsQtd,
    } = data

    const newEvent = {
      title,
      description,
      address,
      category_id: categoryId,
      tickets_qtd: Number(ticketsQtd),
      date_start: new Date(dateStart),
      date_end: new Date(dateEnd),
      hour_start: hourStart,
      hour_end: hourEnd,
      image: imageBase64File,
      type,
    }

    try {
      const { '@spread.token': token } = parseCookies()

      const response = await fetch('http://localhost:3333/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(newEvent),
    })

    if (response.ok) {
      reset()
      handleRemoveImage()
      toast.success('Evento criado com sucesso!')
    }

    } catch (err) {
      toast.error('Não foi possível criar o evento')
    }
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

  return (
    <form className="p-8" onSubmit={handleSubmit(handleCreateEvent)}>
      <header className="my-6">
        <span className="text-slate-800 text-2xl font-medium">
          Dados Básicos
        </span>
        <hr className="my-4 text-slate-100" />
      </header>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-3">
          <label htmlFor="title" className="text-sm text-slate-500 flex">
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
            className="w-full flex items-center bg-slate-50 rounded-[10px] border outline-primary-500 border-slate-300 px-4 py-2 text-slate-700 text-base resize-none"
          />
        </div>

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
              {selectedImages.length ? (
                selectedImages.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image}
                      alt=""
                      className="h-72 w-full object-cover rounded-[10px] px-[1px] py-[3px]"
                    />
                  )
                })
              ) : (
                <span className="text-primary-500">+ Adicionar uma foto</span>
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

        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="category" className="text-sm text-slate-500">
              Categoria do evento
            </label>
            <select
              {...register('categoryId')}
              id="category"
              className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 border px-4 outline-primary-500 text-slate-700 text-sm"
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
            <label htmlFor="category" className="text-sm text-slate-500">
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
            <label htmlFor="date_start" className="text-sm text-slate-500">
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="hour_start" className="text-sm text-slate-500">
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
            <label htmlFor="hour_end" className="text-sm text-slate-500">
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
              className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 border px-4 outline-primary-500 text-slate-700 text-sm"
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
              className="w-full bg-slate-50 rounded-[10px] h-12 border-slate-300 border px-4 outline-primary-500 text-slate-700 text-sm"
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
        Concluir cadastro
      </button>
    </form>
  )

}