'use client'

import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLocalStorageValue } from '@react-hookz/web';

export default function Home() {
  const {
    value: username,
    remove: removeUsername
  } = useLocalStorageValue<string>('username', {
    initializeWithValue: false
  });

  // const router = useRouter()


  const handleLogout = () => {
    removeUsername()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-purple-500 p-4">
      <Card className="w-full max-w-md mb-8">
        <CardContent className="pt-6">
          <h1 className="text-4xl font-bold text-center mb-6">默契大挑战</h1>
          {username ? (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-semibold">欢迎, {username}!</p>
                  <Link href="/profile" className="text-sm text-blue-600 hover:underline">
                    查看个人中心
                  </Link>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                登出
              </Button>
            </div>
          ) : (
            <div className="text-center mb-6">
              <p className="mb-2">你还未登录</p>
              <Link href="/login">
                <Button variant="outline">登录</Button>
              </Link>
            </div>
          )}
          <p className="text-xl text-center mb-6">测试你和朋友的默契程度！</p>
          <Link href={username ? "/quiz/a" : "/login"}>
            <Button className="w-full">
              开始挑战
            </Button>
          </Link>
        </CardContent>
      </Card>
      {Boolean(username) && (
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">快速操作</h2>
            <div className="space-y-4">
              <Link href="/profile">
                <Button variant="outline" className="w-full">查看个人中心</Button>
              </Link>
              <Link href="/quiz/a">
                <Button variant="outline" className="w-full">开始新游戏</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}