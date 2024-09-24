import { prisma } from "@/lib/prisma";
import { Answer, Prisma } from "@prisma/client";
import { cookies } from "next/headers"
import { NextRequest } from "next/server";
import * as R from 'ramda'

export const PUT = async (req: NextRequest, { params }: { params: { sessionId: string } }) => {
  const sessionId = params.sessionId

  const username = cookies().get("username")?.value

  const session = await prisma.session.update(
    {
      data: {
        userB: {
          connect: {
            username
          }
        }
      },
      where: {
        id: sessionId,
      },
    }
  )

  // return new Response(JSON.stringify(session))
  return new Response(JSON.stringify(session))
}



// 对比结果
export const GET = async (req: NextRequest, { params }: { params: { sessionId: string } }) => {
  const sessionId = params.sessionId

  // 创建一个类型安全的对象，用于 `include` 参数
  const sessionInclude: Prisma.SessionInclude = {
    answers: true,
  };

  const session = await prisma.session.findUnique(
    {
      where: {
        id: sessionId,
      },
      include: sessionInclude
    }
  )

  const groupedByQuestionId = R.groupBy((item: Answer) => item.questionId)(session?.answers || []);

  const formattedGroups = R.mapObjIndexed((items, questionId) => ({
    id: questionId,
    values: items
  }))(groupedByQuestionId);

  // return new Response(JSON.stringify(session))
  return new Response(JSON.stringify(Object.values(formattedGroups)))
}

