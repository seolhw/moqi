'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from 'lucide-react'

export default function Home() {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-300 to-purple-400 p-4">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>个人中心</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>登出</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button variant="ghost" className="text-white">登录</Button>
          </Link>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-6">测试你们的默契程度！</h2>
            <p className="text-center mb-6 text-gray-600">
              {user ? `准备好挑战了吗，${user.name}？` : '登录并开始你的默契之旅！'}
            </p>
            <Link href={user ? "/quiz/a" : "/login"}>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                {user ? '开始新游戏' : '登录并开始'}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {user && (
          <div className="mt-8 w-full max-w-md">
            <Link href="/profile">
              <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm hover:bg-white/60 text-purple-700">
                查看游戏记录
              </Button>
            </Link>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-white text-sm">
        © 2023 情侣默契大挑战. 保留所有权利.
      </footer>
    </div>
  )
}