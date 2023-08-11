import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonEvents() {
  return (
    <div className="m-8">
      <header className="flex items-center justify-between">
        <Skeleton className="h-4 w-[250px]" />

        <Skeleton className="h-4 w-[250px]" />
      </header>
      <div className="grid grid-cols-4 gap-4 mt-8">
        <Skeleton className="h-72 w-[296px]" />
        <Skeleton className="h-72 w-[296px]" />
        <Skeleton className="h-72 w-[296px]" />
        <Skeleton className="h-72 w-[296px]" />
      </div>
    </div>
  )
}
