import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export const POST = async () => {
  const username = cookies().get("username")?.value

  if (!username) {
    return new Response("未登录")
  }

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) {
    return new Response("用户不存在")
  }

  const session = prisma.session.create(
    {
      data: {
        userAId: user.id,
      }
    }
  )

  return new Response(JSON.stringify(session))
}


