'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Page() {
  const params = useParams()
  const [copied, setCopied] = useState(false)
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/quiz/b/${params.id}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-300 to-purple-400 p-4">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">分享链接给你的另一半</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              value={shareUrl}
              readOnly
              className="bg-white/50"
            />
            <Button onClick={copyToClipboard} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
              {copied ? '已复制！' : '复制链接'}
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 text-center text-white text-sm">
        © 2023 情侣默契大挑战. 保留所有权利.
      </footer>
    </div>
  )
}