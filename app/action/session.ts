import { prisma } from "@/lib/prisma";
import { Answer, Prisma } from "@prisma/client";
import { cookies } from "next/headers"
import { NextRequest } from "next/server";
import * as R from 'ramda'

// 对比结果
export const getSessionResult = async (sessionLink: string) => {
  // 创建一个类型安全的对象，用于 `include` 参数
  const sessionInclude: Prisma.SessionInclude = {
    answers: {
      include: {
        question: true
      }
    },
  };

  const session = await prisma.session.findUnique(
    {
      where: {
        link: sessionLink
      },
      include: sessionInclude
    }
  )

  const groupedByQuestionId = R.groupBy((item: Answer) => item.questionId)(session?.answers || []);

  const formattedGroups = R.mapObjIndexed((items: any, questionId) => ({
    id: questionId,
    values: items.map((e: any) => ({ ...e, question: undefined })),
    ...items?.[0]?.question
  }))(groupedByQuestionId);

  // return new Response(JSON.stringify(session))
  return Object.values(formattedGroups);
}


export const getSessionUser = async (sessionLink: string) => {
  // 创建一个类型安全的对象，用于 `include` 参数
  const sessionInclude: Prisma.SessionInclude = {
    userA: true,
    userB: true
  };

  const session = await prisma.session.findUnique(
    {
      where: {
        link: sessionLink
      },
      include: sessionInclude
    }
  )

  return session
}


