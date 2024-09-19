'use client'
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAsync } from '@react-hookz/web';
import { useForm } from 'react-hook-form'
import Link from 'next/link'
export default function Page() {
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm<{
    username: string
  }>()

  const router = useRouter()
  const searchParams = useSearchParams()

  const path = searchParams.get("path")


  const [{ status }, createUser] = useAsync(async (username: string) => {
    const data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username })
    }).then((res) => res.json())
    return data
  })



  const onSubmit = async ({ username }: {
    username: string
  }) => {
    await createUser.execute(username)
    toast({
      title: "登录成功",
      description: "",
      duration: 1000
    })
    if (path) {
      router.replace(path?.toString())
    } else {
      router.replace('/')
    }
  }

  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">登录</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="输入你的用户名"
                  {...register("username", { required: "用户名是必填的" })}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
              {/* {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )} */}
              <Button loading={status === "loading"} type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                登录
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  )
}