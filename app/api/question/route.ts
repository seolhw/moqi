import { prisma } from "@/lib/prisma"
import { Question } from "@prisma/client";
import { NextRequest } from "next/server";


export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const alreadyFetchedIds = searchParams.getAll('ids');

  // 获取一个随机的问题
  const randomQuestion: Question[] = await prisma.$queryRaw`SELECT * FROM "Question" WHERE id NOT IN (${alreadyFetchedIds.join(",")}) ORDER BY RANDOM() LIMIT 1;`

  // if (!randomQuestion?.[0]) {
  //   return null;
  // }

  return new Response(JSON.stringify(randomQuestion?.[0]))
}

