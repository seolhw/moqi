'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useLocalStorageValue } from '@react-hookz/web';

export default function Page() {
  const {
    value: username,
    set: setUsername,
  } = useLocalStorageValue<string>('username', {
    initializeWithValue: false
  });

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.replace('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-purple-500 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">登录到默契大挑战</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                type="text"
                placeholder="输入你的用户名"
                value={username}
                onChange={(e) => {
                  const v = e.target.value
                  v.trim() && setUsername(v.trim())
                }}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}