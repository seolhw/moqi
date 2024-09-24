'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SessionWithAnswers } from '@/lib/prisma'
import { createAvatar } from '@dicebear/core'
import { adventurer } from '@dicebear/collection'
import urlJoin from 'url-join'
import { useAsync } from '@react-hookz/web'
import { Session } from '@prisma/client'


export default function InvitePage({ session }: {
  session: SessionWithAnswers
}) {
  const router = useRouter()
  const usernameA = session.userA.username

  const avatarUrl = useMemo(() => {
    if (usernameA) {
      const avatar = createAvatar(adventurer, {
        seed: usernameA,
        // ... other options
      });

      return avatar.toDataUri();
    }
  }, [usernameA])

  const [{ status }, { execute }] = useAsync<Session, string[]>(async () => {
    const data = await fetch(`/api/session/${session?.id}`, {
      method: "PUT",
    }).then((res) => res.json())
    return data
  })


  const handleAcceptChallenge = async () => {
    await execute()

    const url = urlJoin("/", "quiz", session.link, "reply");
    router.push(url)
  }

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">你被邀请参加默契挑战！</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarUrl} alt={usernameA} />
          <AvatarFallback>{usernameA}</AvatarFallback>
        </Avatar>
        <p className="text-xl font-semibold mt-0">{usernameA} 向你发起了挑战</p>
        <p className="text-center text-gray-600 mt-4">
          准备好测试你们之间的默契度了吗？接受挑战，看看你们有多了解对方！
        </p>
        <Button
          onClick={handleAcceptChallenge}
          loading={status === "loading"}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg py-6 mt-4"
        >
          接受挑战
        </Button>
      </CardContent>
    </Card>
  )
}