import dayjs from 'dayjs'
import HomeFeed from '../components/Feed/Home'

export default function Page() {
  const filter = {
    since: dayjs().subtract(1, 'minute').unix(),
    until: dayjs().unix(),
    kinds: [1],
    limit: 1
  }

  return <HomeFeed filter={filter} />
}
