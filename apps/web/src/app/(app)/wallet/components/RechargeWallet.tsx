'use client'

import { useState } from "react"
import * as Dialog from '@radix-ui/react-dialog'
import { RechargeWalletModal } from "./RechargeModal"

export function RechargeWallet() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function onToggleModal() {
    setIsModalOpen(!isModalOpen)
  }
  
  return (
    <Dialog.Root open={isModalOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={onToggleModal}
          className="px-4 h-12 bg-orange-500 rounded-md text-white font-medium hover:bg-primary-500/90"
        >
          Carregar carteira
        </button>
      </Dialog.Trigger>

      <RechargeWalletModal onClose={onToggleModal} />
    </Dialog.Root>

  )
}