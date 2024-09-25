import { prisma } from "@/lib/prisma"
import { Question } from "@prisma/client";
import { NextRequest } from "next/server";


export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const alreadyFetchedIds = searchParams.getAll('ids').map(id => `'${id}'`)

  // 获取一个随机的问题
  const randomQuestion: Question[] = await prisma.$queryRaw`SELECT * FROM "Question" WHERE id NOT IN (${alreadyFetchedIds.join(",")}) ORDER BY RANDOM() LIMIT 1;`

  const { id } = randomQuestion?.[0]


    const randomQuestion2: Question[] = await prisma.$queryRaw`SELECT count(*) FROM "Question" WHERE id NOT IN (${alreadyFetchedIds.join(",")}) ORDER BY RANDOM() LIMIT 10000;`

    console.log("🚀 ~ GET ~ randomQuestion2:", `SELECT * FROM "Question" WHERE id NOT IN (${alreadyFetchedIds.join(",")}) ORDER BY RANDOM() LIMIT 1;`)
  if (alreadyFetchedIds.includes(id)) {
    console.log("重复了", `SELECT * FROM "Question" WHERE id NOT IN (${alreadyFetchedIds.join(",")}) ORDER BY RANDOM() LIMIT 1;`)
  }
  // if (!randomQuestion?.[0]) {
  //   return null;
  // }

  return new Response(JSON.stringify(randomQuestion?.[0]))
}

