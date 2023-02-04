'use client'

import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import UserFeed from '../../components/Feed/User'
import Profile from '../../components/Profile'

export default function Page() {
  const params = useSearchParams()

  const filter = {
    authors: [params.get('pubkey')],
    until: dayjs().unix(),
    kinds: [1],
    limit: 1
  }

  return (
    <>
      <Profile pubkey={params.get('pubkey')} />
      <UserFeed filter={filter} />
    </>
  )
}
