import dayjs from 'dayjs'
import HomeFeed from '../components/Feed/Home'

export default function Page() {
  const filter = {
    since: 0,
    until: dayjs().unix(),
    kinds: [1],
    limit: 1
  }

  return <HomeFeed filter={filter} />
}
