import Link from 'next/link'
import { getSession } from '@/lib/session'

export default async function QuizReply({ params: { sessionLink } }: {
  params: {
    sessionLink: string
  }
}) {

  const session = await getSession(sessionLink)

  return (
    <>
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">情侣默契大挑战</h1>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <h1>应答</h1>
        {/* <QuestionCard session={session!} /> */}
      </main>
    </>
  )
}