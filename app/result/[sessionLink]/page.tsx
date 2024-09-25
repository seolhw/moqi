
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { getSessionResult, getSessionUser } from '@/app/action/session'
import { useEffect, useMemo } from 'react'
import { createAvatar } from '@dicebear/core'
import { adventurer } from '@dicebear/collection'
import { getEvaluation } from '@/lib/evaluation'
import { SessionResult } from '@/lib/prisma'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Session } from '@prisma/client'
import Back from './components/back'

export default async function ResultDetails({ params }: { params: { sessionLink: string } }) {
  const questions = await getSessionResult(params.sessionLink)
  console.log("🚀 ~ ResultDetails ~ questions:", JSON.stringify(questions[0], null, 2))
  const { userA, userB } = (await getSessionUser(params.sessionLink))!

  const avatarUrl = (() => {
    if (userA.username) {
      const avatar = createAvatar(adventurer, {
        seed: userA.username,
        // ... other options
      });

      return avatar.toDataUri();
    }
  })()

  const userBAvatarUrl = (() => {
    if (userB?.username) {
      const avatar = createAvatar(adventurer, {
        seed: userB?.username,
        // ... other options
      });

      return avatar.toDataUri();
    }
  })()



  const score = (() => {
    if (questions) {
      const s = questions.filter(item => {
        return item.values.every((e: any, _: any, arr: any) => e.key === arr[0].key)
      })
      return s.length
    } return 0
  })()

  const evaluation = getEvaluation(score)

  const isTrue = (question: any) => {
    const userAR = question.values.find((item: any) => item.userId === userA.id).key
    const userBR = question.values.find((item: any) => item.userId === userB!.id).key
    return userAR === userBR
  }

  if (!userB) {
    return <>
      <h1>你的另一半还没作答，请等待答题完成。</h1>
    </>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 to-purple-400 p-4">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <Back />
          <h1 className="text-2xl font-bold text-white">结果详情</h1>
        </header>

        <Card className="mb-8 bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={avatarUrl} alt={userA.username} />
                  <AvatarFallback>{userA.username}</AvatarFallback>
                </Avatar>
                <div className='text-xs text-gray-500 text-center'>{userA.username}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">{score}<span className="text-2xl text-gray-500">/10</span></div>
                <div className="text-sm text-gray-500">匹配度</div>
              </div>
              <div>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userBAvatarUrl} alt={userB.username} />
                  <AvatarFallback>{userB.username}</AvatarFallback>
                </Avatar>
                <div className='text-xs text-gray-500 text-center'>{userB.username}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{evaluation.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-700">{evaluation.title}</h3>
              <p className="text-gray-600">{evaluation.description}</p>
            </div>

          </CardFooter>
        </Card>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={question.id} className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Q{index + 1}: {question.content}</h3>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{userA.username}: <span className='text-xl font-bold'>{question.values.find((e: any) => userA.id === e.userId).key}</span></span>
                      <span>{userB.username}: <span className='text-xl font-bold'>{question.values.find((e: any) => userB.id === e.userId).key}</span></span>
                    </div>
                  </div>
                  {isTrue(question) ? (
                    <CheckCircle className="text-green-500 h-6 w-6 ml-4 flex-shrink-0" />
                  ) : (
                    <XCircle className="text-red-500 h-6 w-6 ml-4 flex-shrink-0" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/">
            <Button variant="outline" className="bg-white text-purple-500 border-purple-500 hover:bg-purple-100">
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}