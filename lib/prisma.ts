import { Prisma, PrismaClient, Question } from "@prisma/client"
// import { log } from "./logger"
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// $extends 不能在nextjs中使用，不清楚什么原因
// export const prisma = prismaClient.$extends({
//   query: {
//     user: {
//       async findUnique({ model, operation, args, query }) {

//         // if (args.where.id) {
//         //   const userCache = await redis.get(`user/id/${args.where.id}`)
//         //   if (userCache) {
//         //     log.info(`${`user/id/${args.where.id}`} --- 已缓存数据，从缓存中返回`)
//         //     return JSON.parse(userCache)
//         //   } else {
//         //     const data = await query(args)
//         //     if (!data) {
//         //       return data;
//         //     }
//         //     // await redis.set(`user/id/${data.id}`, JSON.stringify(data), "EX", 10 * 60); // 十分钟后过期
//         //     return data
//         //   }
//         // }

//         return query(args)
//       }
//     }
//   }
// })


// export {
//   prisma
// }


// 一些类型

export type SessionWithAnswers = Prisma.SessionGetPayload<{
  include: {
    answers: true;
  };
}>;


type Options = {
  [key: string]: string;
};

export type QuestionWithOptions =  Omit<Question, 'options'> & {
  options: Options[]
}
