

// 记录问题答案

import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  const body = await new Response(req.body).json()
  const { sessionId, questionId, key } = body

  const data = await prisma.answer.create({
    data: {
      sessionId,
      questionId,
      key
    }
  })

  if (!data) {
    return null
  }

  return new Response(JSON.stringify({
    "message": "回答已记录"
  }))
}