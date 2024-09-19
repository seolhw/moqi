// 初始化数据库，不要使用

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const a = [
  {
    "content": "你喜欢吃火锅或是麻辣烫吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你喜欢喝咖啡吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你喜欢玩手机游戏吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你是关了三次闹钟以上才会起床的人吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你早上是先刷牙后洗脸吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你通常是不是晚上十一点之后才睡觉？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否每周坚持运动？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否期待或是会成为灰太狼一样的老公？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "情侣间吵架，彼此都有错，你是否会主动认错？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否介意对方的异性朋友较多？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否认为吸烟是男生不能容忍的坏习惯？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为恋爱中情侣是否应该粘在一起而不是若即若离？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为女生是否可以向男生主动表白？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为结婚前是否一定得买房子？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为婚前财产公证是否有必要？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  }
];

const b = [
  {
    "content": "你喜欢吃火锅或是麻辣烫吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你喜欢喝咖啡吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你喜欢玩手机游戏吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你是关了三次闹钟以上才会起床的人吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你早上是先刷牙后洗脸吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你通常是不是晚上十一点之后才睡觉？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否每周坚持运动？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否期待或是会成为灰太狼一样的老公？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "情侣间吵架，彼此都有错，你是否会主动认错？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否介意对方的异性朋友较多？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否认为吸烟是男生不能容忍的坏习惯？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为恋爱中情侣是否应该粘在一起而不是若即若离？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为女生是否可以向男生主动表白？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为结婚前是否一定得买房子？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为婚前财产公证是否有必要？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你喜欢吃油炸食品吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "朋友聚会你会喝醉吗？",
    "options": [
      { "A": "会" },
      { "B": "不会" }
    ]
  },
  {
    "content": "你喜欢网购吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你是大部分衣服都用洗衣机洗吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你起床时会叠被子吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你挤牙膏是从中间开始挤吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否每周都会给家里打电话？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为男朋友给女朋友买苏菲丢人吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为重色轻友可耻吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否是个浪漫的人？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否建议恋人在与你交谈中将你与前任做比较？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否会用信用卡预先消费？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否认为情侣结婚前一定要有求婚仪式？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你是否会介意情侣一起攒钱头房子？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你认为婚后子女是否有必要和父母同住？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你喜欢吃零食吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你喜欢喝碳酸饮料吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你喜欢看综艺节目吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "休息日你会睡到日上三竿吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  },
  {
    "content": "你喜欢照镜子吗？",
    "options": [
      { "A": "喜欢" },
      { "B": "不喜欢" }
    ]
  },
  {
    "content": "你晚上睡觉的时候会关手机吗？",
    "options": [
      { "A": "是" },
      { "B": "否" }
    ]
  }
];

async function main() {
  // const data = prisma.question.createMany({
  //   data: a.push(...b) 
  // })
  return prisma.question.createMany({
    data: a.concat(b),
  })
}

main()
  .then(async (res) => {
    console.log("res", res)
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


