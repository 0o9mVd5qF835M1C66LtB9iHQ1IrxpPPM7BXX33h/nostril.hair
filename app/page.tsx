'use client'

import HomeFeed from '../components/Feed/HomeFeed'
import SendPost from '../components/Feed/SendPost'
import { useAppContext } from '../context/AppContext'

export default function Page() {
  const { privkey } = useAppContext()
  const filter = {
    since: 0,
    kinds: [1],
    limit: 1
  }

  return (
    <>
      {!!privkey && <SendPost />}
      <HomeFeed filter={filter} />
    </>
  )
}
