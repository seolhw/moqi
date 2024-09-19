"use client"
import { useMemo } from 'react'
import Link from 'next/link'
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
import { createAvatar } from '@dicebear/core'
import { adventurer } from '@dicebear/collection'
import { useRouter } from 'next/navigation'
import { useCookieValue } from '@/lib/useCookieValue';
import Loading from './loading'

export default function Home() {

  const [username, , removeUsername] = useCookieValue("username", {
    initializeWithValue: false
  })

  const router = useRouter()


  const handleLogout = () => {
    removeUsername()
  }


  const avatarUrl = useMemo(() => {
    if (username) {
      const avatar = createAvatar(adventurer, {
        seed: username,
        // ... other options
      });

      return avatar.toDataUri();
    }
  }, [username])


  const isLoading = useMemo(() => {
    if (username === undefined) {
      return true
    }
    return false
  }, [username])


  const startGame = async () => {
    if (username) {
      // 创建游戏
      await fetch("/api/session", {
        method: "POST",
      }).then((res) => res.json())

      router.push("/")
    } else {
      router.push("/login")
    }
  }

  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        {username ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={avatarUrl} alt={username} />
                  <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => { }}>
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
              {username ? `准备好挑战了吗，${username}？` : '登录并开始你的默契之旅！'}
            </p>
            <Button onClick={startGame} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
              {username ? '开始新游戏' : '登录并开始'}
            </Button>
          </CardContent>
        </Card>

        {username && (
          <div className="mt-8 w-full max-w-md">
            <Link href="/profile">
              <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm hover:bg-white/60 text-purple-700">
                查看游戏记录
              </Button>
            </Link>
          </div>
        )}
      </main>

      {isLoading && <Loading />}
    </>
  )
}