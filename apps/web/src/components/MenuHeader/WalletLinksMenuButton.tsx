import Link from 'next/link'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ArrowsDownUp, Wallet, Coins } from 'phosphor-react'

export function WalletLinksMenuButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex gap-2 outline-none rounded-sm items-center justify-center text-zinc-900 hover:text-primary-500 h-full">
          <Wallet className="h-6 w-6" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white z-10 flex-col rounded-lg overflow-auto shadow-md"
          sideOffset={5}
        >
          <DropdownMenu.Item className="outline-none">
            <div className="flex flex-col items-center justify-center gap-2 text-xs px-4 py-3 bg-slate-100">
              <Wallet className="h-6 w-6 text-slate-400" />
              <span className="text-slate-600">Valor na carteira</span>
              <strong>0,00kz</strong>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none">
            <Link
              href="#"
              className="flex items-center  gap-2 text-xs px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <ArrowsDownUp
                className="h-4 w-4 text-primary-500"
                weight="fill"
              />
              Ver transações
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none">
            <Link
              href="#"
              className="flex items-center  gap-2 text-xs px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <Coins className="h-4 w-4 text-primary-500" weight="regular" />
              Carregar carteira
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.Arrow className="fill-primary-500" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
