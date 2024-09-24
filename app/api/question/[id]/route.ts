import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id

  const question = await prisma.question.findUnique(
    {
      where: {
        id,
      },
    }
  )

  // return new Response(JSON.stringify(session))
  return new Response(JSON.stringify(question))
}