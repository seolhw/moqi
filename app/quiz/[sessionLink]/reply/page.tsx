import Link from 'next/link'
import { getSession } from '@/lib/session'
import ReplyCard from '../components/replyCard'
import { cookies } from 'next/headers'
import { getUserInfo } from '@/app/action/user'

export default async function QuizReply({ params: { sessionLink } }: {
  params: {
    sessionLink: string
  }
}) {
  const session = await getSession(sessionLink)
  const userinfo = await getUserInfo()


  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <ReplyCard userinfo={userinfo!} session={session!} />
      </main>
    </>
  )
}