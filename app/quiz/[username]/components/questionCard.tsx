"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Session } from '@prisma/client'
import { useAsync } from '@react-hookz/web'
import { useMemo } from 'react'



export default function QuestionCard({ session }: {
  session: Session
}) {

  const handleAnswer = (answer: string) => {

  }

  const [currentQuestion] = useAsync(async () => {
    const data = await fetch("/api/question").then((res) => res.json())
    return data
  })

  useMemo(() => {
    console.log("currentQuestion", currentQuestion)
  }, [currentQuestion])

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        {/* <CardTitle className="text-2xl font-bold text-center">问题 {currentQuestionIndex + 1}/10</CardTitle> */}
      </CardHeader>
      <CardContent>
        {/* <p className="text-xl mb-6 text-center">{currentQuestion.question}</p> */}
        <div className="space-y-4">
          {/* {currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            {option}
          </Button>
        ))} */}
        </div>
      </CardContent>
    </Card>
  )
}