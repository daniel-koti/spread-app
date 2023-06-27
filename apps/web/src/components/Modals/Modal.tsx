import { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { X } from 'phosphor-react'

interface ModalProps {
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ onClose, title, children }: ModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed h-screen w-screen inset-0 bg-black/50" />
      <Dialog.Content className="min-w-[512px] rounded-xl bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-xl focus:outline-none">
        <Dialog.Title className="px-8 py-4  border-slate-200 font-sans">
          <h1 className="text-xl font-medium text-slate-700">{title}</h1>
        </Dialog.Title>

        <Dialog.Close
          onClick={onClose}
          className="absolute border-none bg-transparent top-2 right-2 cursor-pointer text-zinc-700"
        >
          <X />
        </Dialog.Close>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
