'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const getEvaluation = (score: number) => {
  if (score === 5) return { title: "天生一对", description: "你们简直是一个模子里刻出来的！心有灵犀，默契十足！" }
  if (score === 4) return { title: "心灵伴侣", description: "你们的默契度令人羡慕，继续保持这种默契吧！" }
  if (score === 3) return { title: "甜蜜搭档", description: "你们有一些共同点，也有一些不同，这正是爱情的魅力所在！" }
  if (score === 2) return { title: "有趣的组合", description: "虽然默契还不够，但这正是了解对方的好机会！" }
  if (score === 1) return { title: "反差萌", description: "也许你们刚认识不久？多多交流，默契度一定会提高的！" }
  return { title: "独特的火花", description: "哇哦，你们的想法真是南辕北辙啊！不妨多聊聊，说不定会有意外收获呢！" }
}

export function Page() {
  const [score, setScore] = useState(0)
  const params = useParams()

  useEffect(() => {
    setScore(Math.floor(Math.random() * 6))
  }, [params.id])

  const evaluation = getEvaluation(score)

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
            <CardTitle className="text-2xl font-bold text-center">你们的默契度</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-6xl font-bold mb-4">{score}/5</p>
            <h3 className="text-2xl font-semibold mb-2">{evaluation.title}</h3>
            <p className="text-lg mb-6">{evaluation.description}</p>
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                再玩一次
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 text-center text-white text-sm">
        © 2023 情侣默契大挑战. 保留所有权利.
      </footer>
    </div>
  )
}