import { cookies } from 'next/headers'

export const POST = async () => {

  cookies().delete("username")

  return {
    "message": "退出成功"
  }
}


