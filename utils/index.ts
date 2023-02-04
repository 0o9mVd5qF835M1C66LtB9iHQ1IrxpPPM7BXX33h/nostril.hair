/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs'
import { nip19 } from 'nostr-tools'
import relativeTime from 'dayjs/plugin/relativeTime'
import { sanitize } from 'dompurify'

dayjs.extend(relativeTime)

export const shortenID = (ID: string, number = 5) => {
  if (!ID) return ''
  const prefix = ID.slice(0, 4)
  if (['npub', 'nsec', 'note'].includes(prefix))
    return `${ID.slice(0, number + prefix.length)}:${ID.slice(-number)}`
  return ID ? `${ID.slice(0, number)}:${ID.slice(-number)}` : ''
}

export const relativeTimeUTC = (value: number) => {
  const now = Math.floor(dayjs().valueOf() / 1000)

  const seconds = now - value
  if (seconds < 60) return `${seconds <= 0 ? 1 : seconds}s ago`

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  return dayjs(value * 1000)
    .fromNow()
    .replace('a ', '1')
    .replace(' days', 'd')
    .replace('day', 'd')
    .replace(' weeks', 'w')
    .replace('week', 'w')
    .replace(' months', 'mo')
    .replace('month', 'mo')
    .replace(' years', 'y')
    .replace('year', 'y')
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

export const mapEvent = (content: string, tags: string[][]) => {
  const events = {
    profiles: [],
    replies: [],
    mentions: []
  }

  // eslint-disable-next-line no-param-reassign
  content = String(content).trim()
  if (content === '') {
    return {
      content,
      replies: [],
      mentions: tags.filter(([key, value]) => key === 'e' && value).map(([_, value]) => value)
    }
  }
  const rootIndex = tags.findIndex(
    ([key, value, _, marker]) => key === 'e' && value && marker === 'root'
  )

  if (rootIndex >= 0) {
    const [_, value] = tags[rootIndex]

    if (!events.mentions.includes(value) && events.replies.length < 2) {
      events.replies.push(value)
    }

    const replyIndex = tags.find(
      ([key, value, _, marker]) => key === 'e' && value && marker === 'reply'
    )

    if (Number(replyIndex) >= 0) {
      const [_, value] = tags[Number(replyIndex)]
      if (!events.mentions.includes(value) && events.replies.length < 2) events.replies.push(value)
    }
  }

  tags
    .filter(([key, value, _, marker]) => key === 'e' && value && marker === 'mention')
    .forEach(([_, value]) => {
      if (!events.mentions.includes(value)) {
        events.mentions.push(value)
      }
    })

  tags
    .filter(([key, value]) => key === 'e' && value)
    .forEach(([_, value]) => {
      if (!events.mentions.includes(value) && !events.replies.includes(value)) {
        // if (index < 2) mentions.replyEvents.push(v)
        if (events.replies.length < 2) events.replies.push(value)
        else events.mentions.push(value)
      }
    })

  return {
    content: sanitize(content),
    replies: events.replies,
    mentions: events.mentions
  }
}
