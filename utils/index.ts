import { nip19 } from 'nostr-tools'

export const shortenID = (ID: string, number = 5) => {
  if (!ID) return ''
  const prefix = ID.slice(0, 4)
  if (['npub', 'nsec', 'note'].includes(prefix))
    return `${ID.slice(0, number + prefix.length)}…${ID.slice(-number)}`
  return ID ? `${ID.slice(0, number)}…${ID.slice(-number)}` : ''
}

export const relativeTimeUTC = (value: number) => {
  const now = Math.floor(Date.now() / 1000)

  const seconds = now - value
  if (seconds < 60) return `${seconds <= 0 ? 1 : seconds}s ago`

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  return value
}

export const bech32ToHex = (key: string) => {
  try {
    const { data } = nip19.decode(key)
    return data
  } catch (error) {
    return ''
  }
}

export const urlify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const urlImageRegex = /(https?:\/\/[^\s]+.(jpg|jpeg|png|gif))/g

  return text
    .replace(/(^|\s)(#[a-z\d-]+)/gi, `$1<span style="color:#1A7DBA">$2</span>`)
    .replace(urlRegex, (url) => {
      if (urlImageRegex.test(url)) {
        return `
          <a href="${url}" target="_blank">
            <img src="${url}" style="max-width:100%; max-height:250px" />
          </a>
        `
      }

      return `
        <a style="color:#1A7DBA" href="${url}" target="_blank">
          ${url}
        </a>
      `
    })
}
