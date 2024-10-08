"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAsync, useList, useMountEffect } from '@react-hookz/web'
import { useMemo } from 'react'
import { Answer, Prisma, Question, Session, User } from '@prisma/client'
import { QuestionWithOptions, SessionWithAnswers } from '@/lib/prisma'
import Loading from '@/app/loading'
import { Input } from '@/components/ui/input'
import urlJoin from 'url-join';
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Shuffle } from 'lucide-react'

const optionColors = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-grap-500 to-amber-500",
]

export default function QuestionCard({ session, userinfo }: {
  session: SessionWithAnswers
  userinfo: User
}) {
  const router = useRouter()
  const ids = session?.answers?.filter(item => item.userId === userinfo.id)?.map(item => item.id) || []

  const [list, { push }] = useList<string>(ids)

  const [{ status, result: currentQues }, { execute: nextQues }] = useAsync<QuestionWithOptions, string[]>(async (questionId?: string) => {

    const params = new URLSearchParams();
    list.concat(questionId ? [questionId] : []).forEach((id) => params.append("ids", id))

    const data = await fetch(`/api/question?${params}`).then((res) => res.json())
    return data
  })

  const [, { execute }] = useAsync<Answer, string[]>(async (questionId: string, key: string) => {
    const data = await fetch(`/api/answer`, {
      method: "POST",
      body: JSON.stringify({
        sessionId: session?.id, questionId, key
      })
    }).then((res) => res.json())
    return data
  })


  const handleAnswer = (key: string) => {
    if (currentQues?.id) {
      push(currentQues?.id)
      execute(currentQues?.id, key)

      if (list.length < 10) {
        nextQues(currentQues?.id)
      }

    }
  }

  useMountEffect(nextQues)


  const shareUrl = urlJoin(process.env.NEXT_PUBLIC_HOST || "", "share", session.link);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "复制成功",
      duration: 1000
    })
  }

  const [{ status: createStatus }, creatSession] = useAsync<Session>(async () => {
    const session = await fetch("/api/session", {
      method: "POST",
    }).then((res) => res.json())
    return session
  })

  const startGame = async () => {
    // 创建游戏
    const session = await creatSession.execute()

    router.push(`/quiz/${session?.link}`)
  }

  const handleShuffle = () => {
    nextQues()
  }


  if (status === "loading") {
    return <Loading />
  }

  if (list.length >= 10) {
    return (
      <div>
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">答题完成</CardTitle>
            <CardDescription className='text-center'>快去分享给你的另一半，测测默契度吧</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Input
              type="text"
              value={shareUrl}
              readOnly
              className="bg-white/50"
            />
            <div className='flex gap-4 mt-6'>
              <Button onClick={copyToClipboard} className={`w-full text-white bg-gradient-to-r ${optionColors[0]} hover:opacity-90 transition-opacity`}>
                直接分享
              </Button>
              <Button onClick={copyToClipboard} className={`w-full text-white bg-gradient-to-r ${optionColors[1]} hover:opacity-90 transition-opacity`}>
                复制链接
              </Button>
              <Button onClick={startGame} loading={createStatus === "loading"} className={`w-full text-white bg-gradient-to-r ${optionColors[2]} hover:opacity-90 transition-opacity`}>
                再玩一次
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className='flex gap-4 mt-10 justify-center'>
          <Link href="/profile">
            <Button className={`w-full text-white bg-gray-500 hover:opacity-90 transition-opacity`}>
              查看游戏记录
            </Button>
          </Link>
          <Link href="/profile">
            <Button className={`w-full text-white bg-gray-500 hover:opacity-90 transition-opacity`}>
              回到首页
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!currentQues) {
    return <Loading />
  }

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl font-bold">问题 {list.length + 1}/10</CardTitle>
          <Button
            onClick={handleShuffle}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 absolute top-4 right-4 flex items-center space-x-1"
            // disabled={}
            size="sm"
          >
            <Shuffle className="h-4 w-4 mr-1" />
            <span className="text-sm">换一题</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-6 text-center">{currentQues.content}</p>
        <div className="flex gap-4">
          {currentQues.options.map((item, index) => {
            const key = Object.keys(item)?.[0]
            const value = Object.values(item)?.[0]
            return (
              <Button
                key={index}
                onClick={() => handleAnswer(key)}
                className={`w-full text-white bg-gradient-to-r ${optionColors[index % optionColors.length]} hover:opacity-90 transition-opacity`}
              >
                {value}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}