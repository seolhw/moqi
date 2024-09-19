import { Prisma } from '@prisma/client';
import { prisma } from './prisma'


export const getSession = async (sessionLink: string) => {

  const sessionInclude: Prisma.SessionInclude = {
    answers: true,
    userA: true
  };


  const data = prisma.session.findUnique(
    {
      where: {
        link: sessionLink,
      },
      include: sessionInclude
    }
  )

  return data

}