'use client'

import { useSearchParams } from 'next/navigation'
import HomeFeed from '../../components/Feed/HomeFeed'
import Profile from '../../components/Profile'

export const dynamic = 'force-static'
export const dynamicParams = true

export default function Page({ params }) {
  useSearchParams()

  const filter = {
    authors: [params.user],
    since: 0,
    kinds: [1]
  }

  return (
    <>
      <Profile pubkey={params.user} />
      <HomeFeed filter={filter} isProfilePage />
    </>
  )
}
