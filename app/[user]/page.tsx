'use client'

import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import UserFeed from '../../components/Feed/User'
import Profile from '../../components/Profile'

export const dynamic = 'force-static'
export const dynamicParams = true

export default function Page({ params }) {
  useSearchParams()

  const filter = {
    authors: [params.user],
    until: dayjs().unix(),
    kinds: [1],
    limit: 1
  }

  return (
    <>
      <Profile pubkey={params.user} />
      <UserFeed filter={filter} />
    </>
  )
}
