'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { questions } from '@/app/data/questions'

export default function Quiz() {
  const [currentQuestions, setCurrentQuestions] = useState<typeof questions>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    setCurrentQuestions([...questions].sort(() => Math.random() - 0.5).slice(0, 5))
  }, [])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      const answerId = Date.now().toString()
      if (params.type === 'a') {
        router.push(`/share/${answerId}`)
      } else {
        router.push(`/results/${answerId}`)
      }
    }
  }

  if (currentQuestions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-300 to-purple-400">加载中...</div>
  }

  const currentQuestion = currentQuestions[currentQuestionIndex]

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
            <CardTitle className="text-2xl font-bold text-center">问题 {currentQuestionIndex + 1}/5</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-6 text-center">{currentQuestion.question}</p>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 text-center text-white text-sm">
        © 2024 情侣默契大挑战. 保留所有权利.
      </footer>
    </div>
  )
}