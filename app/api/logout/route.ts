import { cookies } from 'next/headers'

export const POST = async () => {

  cookies().delete("username")

  return new Response(JSON.stringify({
    "message": "退出成功"
  }))
}


