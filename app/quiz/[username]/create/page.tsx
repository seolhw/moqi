import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { create } from '@/lib/session'
import QuestionCard from '../components/questionCard'

export default async function Quiz({ params: { username } }: {
  params: {
    username: string
  }
}) {
  // 创建一个session
  const session = await create(username)
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-300 to-purple-400 p-4">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <QuestionCard session={session!} />
      </main>

      <footer className="mt-12 text-center text-white text-sm">
        © 2024 情侣默契大挑战. 保留所有权利.
      </footer>
    </div>
  )
}