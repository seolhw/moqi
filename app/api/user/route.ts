import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await new Response(req.body).json()
  const { username } = body
  const user = await prisma.user.create({
    data: {
      username
    }
  })
  cookies().set("username", user.username)
  return new Response(JSON.stringify({
    message: "用户创建成功"
  }))
}