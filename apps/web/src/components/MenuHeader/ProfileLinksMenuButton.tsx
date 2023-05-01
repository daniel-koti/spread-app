import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Avatar } from '../Avatar'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { CaretDown, SignOut } from 'phosphor-react'

export function ProfileLinksMenuButton() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="group flex shrink-0 items-center gap-2 rounded-lg transition">
          <span className="sr-only">Menu</span>
          <Avatar name={user?.name!} />

          <p className="ms-2 hidden text-left text-xs sm:block">
            <strong className="block text-base font-medium text-white">
              {user?.name}
            </strong>
            <span className="text-gray-200">{user?.email}</span>
          </p>
          <CaretDown className="w-4 h-4 text-white" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white z-10 flex-col rounded-lg overflow-auto shadow-md"
          sideOffset={5}
        >
          <DropdownMenu.Item className="outline-none">
            <div className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-gray-50 cursor-pointer">
              Meu perfil
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none" asChild>
            <span
              onClick={signOut}
              className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <SignOut />
              Sair da plataforma
            </span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.Arrow className="fill-primary-500" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
