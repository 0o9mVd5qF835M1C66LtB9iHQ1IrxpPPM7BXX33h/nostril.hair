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

  return dayjs(value * 1000)
    .fromNow()
    .replace(' days', 'd')
    .replace(' day', 'd')
    .replace(' weeks', 'w')
    .replace(' week', 'w')
    .replace(' months', 'mo')
    .replace(' month', 'mo')
    .replace(' years', 'y')
    .replace(' year', 'y')
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

export const mapEvent = (text: string, tags: any) => {
  const events = {
    profiles: [],
    replyEvents: [],
    mentionEvents: []
  }
  // eslint-disable-next-line no-param-reassign
  text = String(text).trim()
  if (text === '') {
    return {
      text,
      replyEvents: [],
      mentionEvents: tags.filter(([t, v]) => t === 'e' && v).map(([_, v]) => v)
    }
  }
  const rootIdx = tags.findIndex(([t, v, _, marker]) => t === 'e' && v && marker === 'root')
  if (rootIdx >= 0) {
    const [_, v] = tags[rootIdx]
    if (!events.mentionEvents.includes(v) && events.replyEvents.length < 2)
      events.replyEvents.push(v)
    const replyIdx = tags.find(([t, v, _, marker]) => t === 'e' && v && marker === 'reply')
    if (replyIdx >= 0) {
      const [_, v] = tags[replyIdx]
      if (!events.mentionEvents.includes(v) && events.replyEvents.length < 2)
        events.replyEvents.push(v)
    }
  }
  tags
    .filter(([t, v, _, marker]) => t === 'e' && v && marker === 'mention')
    .forEach(([t, v], index) => {
      if (!events.mentionEvents.includes(v)) events.mentionEvents.push(v)
    })
  tags
    .filter(([t, v]) => t === 'e' && v)
    .forEach(([t, v], index) => {
      if (!events.mentionEvents.includes(v) && !events.replyEvents.includes(v)) {
        // if (index < 2) mentions.replyEvents.push(v)
        if (events.replyEvents.length < 2) events.replyEvents.push(v)
        else events.mentionEvents.push(v)
      }
    })

  return {
    text: sanitize(text),
    replies: events.replyEvents,
    mentions: events.mentionEvents
  }
}
