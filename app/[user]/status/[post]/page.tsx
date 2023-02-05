'use client'

import { useSearchParams } from 'next/navigation'
import ReplyFeed from '../../../../components/Feed/ReplyFeed'

export const dynamic = 'force-static'
export const dynamicParams = true

export default function Page({ params }) {
  useSearchParams()

  const filter = {
    ids: [params.post],
    kinds: [1]
  }

  return <ReplyFeed filter={filter} user={params.user} post={params.post} />
}
