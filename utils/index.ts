import dayjs from 'dayjs'
import { nip19 } from 'nostr-tools'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const shortenID = (ID: string, number = 5) => {
  if (!ID) return ''
  const prefix = ID.slice(0, 4)
  if (['npub', 'nsec', 'note'].includes(prefix))
    return `${ID.slice(0, number + prefix.length)}…${ID.slice(-number)}`
  return ID ? `${ID.slice(0, number)}…${ID.slice(-number)}` : ''
}

export const relativeTimeUTC = (value: number) => {
  const now = Math.floor(dayjs().valueOf() / 1000)

  const seconds = now - value
  if (seconds < 60) return `${seconds <= 0 ? 1 : seconds}s ago`

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const ago = dayjs(value * 1000)
    .fromNow()
    .replace(' days', 'd')
    .replace(' day', 'd')
    .replace(' weeks', 'w')
    .replace(' week', 'w')
    .replace(' months', 'mo')
    .replace(' month', 'mo')
    .replace(' years', 'y')
    .replace(' year', 'y')

  console.log(ago)

  return ago
}

export const bech32ToHex = (key: string) => {
  try {
    const { data } = nip19.decode(key)
    return data
  } catch (error) {
    return ''
  }
}

export const hexToBech32 = (key: string, prefix: string) => {
  try {
    switch (prefix) {
      case 'npub':
        return nip19.npubEncode(key)
      case 'nsec':
        return nip19.nsecEncode(key)
      case 'note':
        return nip19.noteEncode(key)
      default:
        return ''
    }
  } catch (error) {
    return ''
  }
}
