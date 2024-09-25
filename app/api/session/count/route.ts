import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

// 对比结果
export const GET = async (req: NextRequest) => {
  const username = req.cookies.get("username")?.value

  const data = await prisma.session.count({
    where: {
      userA: {
        username
      }
    }
  })

  return new Response(JSON.stringify({
    count: data
  }))
}

