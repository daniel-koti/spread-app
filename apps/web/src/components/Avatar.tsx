import { getNamesInitials } from '@/utils/formatted'
import * as AvatarRadix from '@radix-ui/react-avatar'

interface AvatarProps {
  name: string
}

export function Avatar({ name }: AvatarProps) {
  return (
    <AvatarRadix.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-11 h-11 rounded-[100%] bg-gray-300">
      <AvatarRadix.Fallback className="w-full h-full flex items-center justify-center bg-blue-100 text-primary-500 text-sm font-medium leading-relaxed">
        {getNamesInitials(name)}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
