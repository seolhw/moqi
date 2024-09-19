import { Loader2 } from 'lucide-react'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="inline-flex items-center justify-center rounded-lg bg-black bg-opacity-50 p-4 backdrop-blur-sm">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    </div>
  )
}