import Link from 'next/link'
import { getSession } from '@/lib/session'
import InviteCard from './components/inviteCard'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"

export default async function Share({ params: { sessionLink } }: {
  params: {
    sessionLink: string
  }
}) {

  const session = await getSession(sessionLink)

  const username = cookies().get("username")?.value

  if(!username){
    redirect(`/login?path=/quiz/${sessionLink}/reply&sessionId=${session?.id}`)
  }

  const isShowInvite = session?.userA.username !== username

  if (!isShowInvite) {
    redirect(`/quiz/${sessionLink}`)
  }


  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center">
        {isShowInvite ? <InviteCard session={session!} /> : <></>}
      </main>
    </>
  )
}