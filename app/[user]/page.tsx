'use client'

import { useSearchParams } from 'next/navigation'
import DefaultFeed from '../../components/Feed/DefaultFeed'
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
      <DefaultFeed filter={filter} isInfiniteScroll />
    </>
  )
}
