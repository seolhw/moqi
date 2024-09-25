'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { compareAsc, format } from "date-fns";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useCookieValue } from '@/lib/useCookieValue'
import { createAvatar } from '@dicebear/core'
import { adventurer } from '@dicebear/collection'
import { useAsync, useMountEffect } from '@react-hookz/web'
import * as R from 'ramda'
import { SessionResult } from '@/lib/prisma'
import { Answer, Prisma, Session } from '@prisma/client'
import Loading from '../loading'
import { getEvaluation } from '@/lib/evaluation'
import { useRouter } from 'next/navigation';

interface User {
  name: string
  avatar: string
  totalGames: number
  averageScore: number
}

interface ChallengeRecord {
  id: string
  date: string
  partner: string
  score: number
  result: string
}

export default function Profile() {
  const router = useRouter()

  const [username, , removeUsername] = useCookieValue("username", {
    initializeWithValue: false
  })

  const avatarUrl = useMemo(() => {
    if (username) {
      const avatar = createAvatar(adventurer, {
        seed: username,
        // ... other options
      });

      return avatar.toDataUri();
    }
  }, [username])

  const [{ status, result }, { execute: getSessionCount }] = useAsync<{ count: number }>(async () => {
    const session = await fetch("/api/session/count", {
      method: "GET",
    }).then((res) => res.json())
    return session
  })

  const sessionWithAnswers = Prisma.validator<Prisma.SessionDefaultArgs>()({
    include: {
      userA: true,
      userB: true,
      answers: true
    }
  })

  type SessionWithAnswersGetPayload = Prisma.SessionGetPayload<typeof sessionWithAnswers>;

  const [{ status: reslutStatus, result: sessionList = [] }, { execute: getSesionList }] = useAsync<(SessionWithAnswersGetPayload & { score: number })[]>(async () => {
    const data: SessionWithAnswersGetPayload[] = await fetch(`/api/session`, {
      method: "GET"
    }).then((res) => res.json())

    const getScore = R.pipe(
      R.prop("answers"),
      R.groupBy((item: Answer) => item.questionId),
      Object.values,
      R.reduce((acc, answers) => {
        const allSameKey = answers.every((a: Answer) => a.key === answers[0].key);
        return acc + (allSameKey ? 1 : 0);
      }, 0)
    )


    const reslut = R.map((item => {
      return {
        ...item,
        score: getScore(item)
      }
    }), data)
    return reslut
  })

  useMountEffect(() => {
    getSessionCount()
    getSesionList()
  })

  const getEvaluationNode = (score: number) => {
    const data = getEvaluation(score)
    return data.title
  }

  const [{ status: createSessionStatus }, creatSession] = useAsync<Session>(async () => {
    const session = await fetch("/api/session", {
      method: "POST",
    }).then((res) => res.json())
    return session
  })

  const startGame = async () => {
    if (username) {
      // 创建游戏
      const session = await creatSession.execute()

      router.push(`/quiz/${session?.link}`)
    } else {
      router.push("/login")
    }
  }


  if (!username || reslutStatus === "loading" || status === "loading") {
    return <Loading />
  }

  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center max-w-4xl mx-auto min-w-[90%]">
        <Card className="w-full bg-white/90 backdrop-blur-sm shadow-xl mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatarUrl} alt={username!} />
                <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">{username}</CardTitle>
                <div className="mt-2 space-y-1">
                  <Badge variant="secondary">总游戏次数: {R.isNotNil(result?.count) ? result?.count : "正在加载中"}</Badge>
                  {/* <Badge variant="secondary">平均得分: {user.averageScore.toFixed(1)}</Badge> */}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="w-full bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">挑战记录</CardTitle>
          </CardHeader>
          <CardContent>
            {sessionList.map((record) => (
              <div key={record.id} className="mb-4 p-4 bg-white rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{format(record.updatedAt, "yyyy-MM-dd")}</p>
                    <p className="text-sm text-gray-600">与 {record.userB?.username} 的挑战</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">得分: {record.score}/10</p>
                    <Badge
                      variant="outline"
                    >
                      {getEvaluationNode(record.score)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 w-full">
          <Button loading={createSessionStatus === "loading"} onClick={startGame} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
            开始新挑战
          </Button>
        </div>
      </main>
    </>
  )
}