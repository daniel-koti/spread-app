import * as AlertDialog from '@radix-ui/react-alert-dialog'

interface AlertDialogProps {
  title: string
  description: string
  variant: 'create' | 'delete'
  submitText: string
  onSubmit: () => void
  onToggle: () => void
  isOpen: boolean
}

export function Dialog({
  title,
  onToggle,
  description,
  submitText,
  variant,
  onSubmit,
  isOpen,
}: AlertDialogProps) {
  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed h-screen w-screen inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="max-w-[520px] rounded-xl bg-white fixed top-[50%] left-[50%] translate-x-[-50%] p-6 translate-y-[-50%] shadow-xl focus:outline-none">
          <AlertDialog.Title className="text-lg font-semibold text-zinc-800">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="font-alt text-zinc-800 mt-4 mb-5 text-sm leading-7">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-6">
            <AlertDialog.Cancel asChild>
              <button
                onClick={onToggle}
                className="text-zinc-600 bg-zinc-300 hover:bg-zinc-400 focus:shadow-zinc-700 inline-flex h-[35px] items-center justify-center rounded-md px-4 font-medium leading-none outline-none focus:shadow-[0_0_0_2px] cursor-pointer"
              >
                Não
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              {variant === 'create' ? (
                <button
                  onClick={onSubmit}
                  className="text-green-700 bg-green-300 hover:bg-green-400 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-md px-4 font-medium leading-none outline-none focus:shadow-[0_0_0_2px] cursor-pointer"
                >
                  {submitText}
                </button>
              ) : (
                <button
                  onClick={onSubmit}
                  className="text-red-700 bg-red-300 hover:bg-red-400 focus:shadow-red-700 inline-flex h-[35px] items-center justify-center rounded-md px-4 font-medium leading-none outline-none focus:shadow-[0_0_0_2px] cursor-pointer"
                >
                  {submitText}
                </button>
              )}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}