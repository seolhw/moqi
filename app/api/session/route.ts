import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { nanoid } from '@/lib/nanoid'
import { Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

export const POST = async () => {
  const username = cookies().get("username")?.value

  if (!username) {
    return new Response(JSON.stringify({
      message: "未登录"
    }))
  }

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) {
    return new Response(JSON.stringify({
      message: "用户不存在"
    }))
  }

  // 创建一个类型安全的对象，用于 `include` 参数
  const sessionInclude: Prisma.SessionInclude = {
    answers: true,
  };


  const session = await prisma.session.create(
    {
      data: {
        userAId: user.id,
        link: nanoid()
      },
      include: sessionInclude
    }
  )

  return new Response(JSON.stringify(session))
}

export const GET = async (req: NextRequest) => {
  const username = req.cookies.get("username")?.value

  const data = await prisma.session.findMany({
    where: {
      OR: [
        {
          userA: { username }
        },
        {
          userB: { username }
        }
      ]

    },
    include: {
      userA: true,
      userB: true,
      answers: true
    }
  })

  return new Response(JSON.stringify(data))
}






