import Link from 'next/link'
import { getSession } from '@/lib/session'
import QuestionCard from './components/questionCard'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Quiz({ params: { sessionLink } }: {
  params: {
    sessionLink: string
  }
}) {

  const session = await getSession(sessionLink)

  const username = cookies().get("username")?.value

  if (session?.userA.username !== username) {
    // 说明是分享过来的 用户B应答的
    // return redirect('./reply')
    return null;
  }


  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <QuestionCard session={session!} />
      </main>
    </>
  )
}