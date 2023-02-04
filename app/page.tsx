'use client'

import dayjs from 'dayjs'
import Feed from '../components/Feed'
import Heading from '../components/Feed/Heading'
import { useAppContext } from '../context/AppContext'

export default function Page() {
  const { privkey } = useAppContext()
  const filter = {
    since: 0,
    until: dayjs().unix(),
    kinds: [1],
    limit: 1
  }

  return (
    <>
      {!!privkey && <Heading />}
      <Feed filter={filter} />
    </>
  )
}
