'use client'

import HomeFeed from '../components/Feed/HomeFeed'
import SendPost from '../components/Feed/SendPost'

export default function Page() {
  const filter = {
    since: 0,
    kinds: [1],
    limit: 1
  }

  return (
    <>
      <SendPost />
      <HomeFeed filter={filter} />
    </>
  )
}
