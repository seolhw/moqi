'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getEvaluation } from '@/lib/evaluation'
import { SessionWithAnswers } from '@/lib/prisma'

export default function ShareCard({ session }: {
  session: SessionWithAnswers
}) {
  const [score, setScore] = useState(0)
  const params = useParams()

  useEffect(() => {
    setScore(Math.floor(Math.random() * 6))
  }, [params.id])

  const evaluation = getEvaluation(score)

  return (
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
  )
}