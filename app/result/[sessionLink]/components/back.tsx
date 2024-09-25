'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation'


export default function Back() {
  const router = useRouter()

  return (
    <Button variant="ghost" className="text-white" onClick={router.back}>
      <ArrowLeft className="mr-2 h-4 w-4" /> 返回
    </Button>
  )
}