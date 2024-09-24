

// 记录问题答案

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  const body = await new Response(req.body).json()
  const { sessionId, questionId, key } = body

  const username = cookies().get("username")?.value

  const data = await prisma.answer.create({
    data: {
      key,
      user: {
        connect: { username }
      },
      session: {
        connect: { id: sessionId } // 建立与 Session 的关系
      },
      question: {
        connect: { id: questionId } // 建立与 Question 的关系
      }
    }
  })

  if (!data) {
    return new Response(JSON.stringify({
      "message": "出错啦"
    }))
  }

  return new Response(JSON.stringify({
    "message": "回答已记录"
  }))
}