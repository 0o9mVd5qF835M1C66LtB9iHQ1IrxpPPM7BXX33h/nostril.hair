'use client'

import dayjs from 'dayjs'
import { useRef } from 'react'
import DefaultFeed from '../components/Feed/DefaultFeed'
import SendPost from '../components/Feed/SendPost'

export default function Page() {
  const now = useRef(new Date())

  const filter = {
    since: dayjs(now.current).unix() - 60,
    kinds: [1],
    limit: 20
  }

  return (
    <>
      <SendPost />
      <DefaultFeed filter={filter} />
    </>
  )
}
