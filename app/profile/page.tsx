'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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
  const [user, setUser] = useState<User | null>(null)
  const [challengeRecords, setChallengeRecords] = useState<ChallengeRecord[]>([])

  useEffect(() => {
    // 这里应该从API获取实际的用户数据和挑战记录
    // 现在我们只是模拟一些数据
    const mockUser: User = {
      name: "小明",
      avatar: "/placeholder.svg?height=100&width=100",
      totalGames: 15,
      averageScore: 7.5
    }
    setUser(mockUser)

    const mockRecords: ChallengeRecord[] = [
      { id: "1", date: "2023-06-01", partner: "小红", score: 8, result: "默契达人" },
      { id: "2", date: "2023-06-03", partner: "小芳", score: 6, result: "甜蜜搭档" },
      { id: "3", date: "2023-06-05", partner: "小李", score: 9, result: "天生一对" },
      { id: "4", date: "2023-06-07", partner: "小张", score: 7, result: "心有灵犀" },
      { id: "5", date: "2023-06-09", partner: "小王", score: 5, result: "有趣组合" },
    ]
    setChallengeRecords(mockRecords)
  }, [])

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-300 to-purple-400">加载中...</div>
  }

  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center max-w-4xl mx-auto">
        <Card className="w-full bg-white/90 backdrop-blur-sm shadow-xl mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                <div className="mt-2 space-y-1">
                  <Badge variant="secondary">总游戏次数: {user.totalGames}</Badge>
                  <Badge variant="secondary">平均得分: {user.averageScore.toFixed(1)}</Badge>
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
            {challengeRecords.map((record) => (
              <div key={record.id} className="mb-4 p-4 bg-white rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{record.date}</p>
                    <p className="text-sm text-gray-600">与 {record.partner} 的挑战</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">得分: {record.score}/10</p>
                    <Badge
                      // variant={record.score > 7 ? "success" : record.score < 5 ? "destructive" : "default"}
                    >
                      {record.result}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8">
          <Link href="/quiz/a">
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
              开始新挑战
            </Button>
          </Link>
        </div>
      </main>
    </>
  )
}