import { prisma } from './prisma'


export const create = async (username: string) => {

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (!user) {
    return null
  }

  return prisma.session.create(
    {
      data: {
        userAId: user.id,
      }
    }
  )
}