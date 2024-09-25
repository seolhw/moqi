"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAsync, useList, useMountEffect } from '@react-hookz/web'
import { useEffect, useMemo } from 'react'
import { Answer, Prisma, Question, Session, User } from '@prisma/client'
import { QuestionWithOptions, SessionResult, SessionWithAnswers } from '@/lib/prisma'
import Loading from '@/app/loading'
import { Input } from '@/components/ui/input'
import urlJoin from 'url-join';
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createAvatar } from '@dicebear/core'
import { adventurer } from '@dicebear/collection'
import { Progress } from '@/components/ui/progress'
import { HeartIcon } from 'lucide-react'
import { getEvaluation } from '@/lib/evaluation'

const optionColors = [
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
]



export default function ReplyCard({ session, userinfo }: {
  session: SessionWithAnswers
  userinfo: User
}) {
  const router = useRouter()
  const ids = session?.answers?.filter(item => item.userId === userinfo.id)?.map(item => item.id) || []
  const userA = session.userA

  // 第一位答题者的问题
  const quizIds = session?.answers?.filter(item => item.userId !== userinfo.id).map(item => item.questionId)

  const [list, { push }] = useList<string>(ids)

  const [{ status, result: currentQues }, { execute: nextQues }] = useAsync<QuestionWithOptions, string[]>(async (questionId?: string) => {
    const id = quizIds[list.concat(questionId ? [questionId] : []).length]
    if (!id) return null
    const data = await fetch(`/api/question/${id}`).then((res) => res.json())
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


  const [{ status: reslutStatus, result }, { execute: getReslut }] = useAsync<SessionResult[]>(async () => {
    const data = await fetch(`/api/session/${session.id}`, {
      method: "GET"
    }).then((res) => res.json())
    return data
  })

  useEffect(() => {
    if (list.length >= 0) {
      getReslut()
    }
  }, [list, getReslut])


  const score = useMemo(() => {
    if (result) {
      const s = result.filter(item => {
        return item.values.every((e, _, arr) => e.key === arr[0].key)
      })
      return s.length
    } return 0
  }, [result])

  const evaluation = useMemo(() => {
    return getEvaluation(score)
  }, [score])


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


  const avatarUrl = useMemo(() => {
    if (userA.username) {
      const avatar = createAvatar(adventurer, {
        seed: userA.username,
        // ... other options
      });

      return avatar.toDataUri();
    }
  }, [userA.username])

  const userBAvatarUrl = useMemo(() => {
    if (userinfo.username) {
      const avatar = createAvatar(adventurer, {
        seed: userinfo.username,
        // ... other options
      });

      return avatar.toDataUri();
    }
  }, [userinfo.username])



  if (status === "loading" || reslutStatus === "loading") {
    return <Loading />
  }

  if (list.length >= 10) {
    return (
      <>
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden rounded-3xl">
          <CardContent className="p-8">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={avatarUrl} alt={userA.username} />
                  <AvatarFallback>{userA.username}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-center">{userA.username}</p>
              </div>
              <HeartIcon className="w-12 h-12 text-pink-500 animate-pulse" />
              <div>
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userBAvatarUrl} alt={userinfo.username} />
                  <AvatarFallback>{userinfo.username}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-center">{userinfo.username}</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-purple-700 mb-2">默契度</h2>
              <div className="text-6xl font-bold text-pink-500 mb-4">{score}<span className="text-3xl text-purple-500">/10</span></div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div className="bg-gradient-to-r from-pink-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${score * 10}%` }}></div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{evaluation.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-700">{evaluation.title}</h3>
              <p className="text-gray-600">{evaluation.description}</p>
            </div>

            <div className="flex justify-center space-x-4">
              <Link href={`/result/${session.link}`}>
                <Button
                  className={`w-full text-white bg-gradient-to-r ${optionColors[0]} hover:opacity-90 transition-opacity`}
                >
                  查看结果
                </Button>
              </Link>
              <Button
                onClick={startGame}
                className={`w-full text-white bg-gradient-to-r ${optionColors[1]} hover:opacity-90 transition-opacity`}
              >
                再玩一次
              </Button>
              <Link href={"/"}>
                <Button
                  className={`w-full text-white bg-gradient-to-r ${optionColors[2]} hover:opacity-90 transition-opacity`}
                >
                  返回首页
                </Button>
              </Link>

            </div>
          </CardContent>
        </Card>
      </>
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
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">正在作答 {userA.username} 的题目</span>
          </div>
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