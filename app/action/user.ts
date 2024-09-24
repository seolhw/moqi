import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export const getUserInfo = async () => {
  const username = cookies().get("username")?.value


  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  return user;
}

