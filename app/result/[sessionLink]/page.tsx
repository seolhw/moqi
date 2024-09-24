
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { getSessionResult, getSessionUser } from '@/app/action/session'
import { useMemo } from 'react'
import { createAvatar } from '@dicebear/core'
import { adventurer } from '@dicebear/collection'
import { getEvaluation } from '@/lib/evaluation'

export default async function ResultDetails({ params }: { params: { sessionLink: string } }) {
  const result = await getSessionResult(params.sessionLink)
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
    if (result) {
      const s = result.filter(item => {
        return item.values.every((e: any, _: any, arr: any) => e.key === arr[0].key)
      })
      return s.length
    } return 0
  })()

  const evaluation = (() => {
    return getEvaluation(score)
  })()



  if (!userB) {
    return <>
      <h1>你的另一半还没作答，请等待答题完成。</h1>
    </>
  }

  console.log("🚀 ~ ResultDetails ~ result:", result[0])
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 to-purple-400 p-4">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <Button variant="ghost" className="text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回
          </Button>
          <h1 className="text-2xl font-bold text-white">结果详情</h1>
        </header>

        <Card className="mb-8 bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <Avatar className="w-16 h-16">
                <AvatarImage src={avatarUrl} alt={userA.username} />
                <AvatarFallback>{userA.username}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">{score}<span className="text-2xl text-gray-500">/10</span></div>
                <div className="text-sm text-gray-500">匹配度</div>
              </div>
              <Avatar className="w-16 h-16">
                <AvatarImage src={userBAvatarUrl} alt={userB.username} />
                <AvatarFallback>{userB.username}</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id} className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Q{question.id}: {question.question}</h3>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{userA.name}: {question.userAAnswer}</span>
                      <span>{userB.name}: {question.userBAnswer}</span>
                    </div>
                  </div>
                  {question.isMatch ? (
                    <CheckCircle className="text-green-500 h-6 w-6 ml-4 flex-shrink-0" />
                  ) : (
                    <XCircle className="text-red-500 h-6 w-6 ml-4 flex-shrink-0" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/quiz/a">
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              再玩一次
            </Button>
          </Link>
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