import { prisma } from "@/lib/prisma"


export const GET = async () => {
  // 获取一个随机的问题
  const randomQuestion = await prisma.$queryRaw`SELECT * FROM "Question" ORDER BY RANDOM() LIMIT 1;`

  return new Response(JSON.stringify(randomQuestion))
}
