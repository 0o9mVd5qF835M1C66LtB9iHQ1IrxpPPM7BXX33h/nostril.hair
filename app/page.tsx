import dayjs from 'dayjs'
import Feed from '../components/Feed'

export default function Page() {
  const filter = {
    since: 0,
    until: dayjs().unix(),
    kinds: [1],
    limit: 1
  }

  return <Feed filter={filter} />
}
