import { renderToString } from 'react-dom/server'
import ParsedHashTag from './HashTag'
import ParsedImage from './Image'
import ParsedLink from './Link'

interface Props {
  content: string
}

export default function ParsedText({ content }: Props) {
  const hashtagRegex = /(^|\s)(#[a-z\d-]+)/gi
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const urlImageRegex = /(https?:\/\/[^\s]+.(jpg|jpeg|png|gif|webp))/g

  const parsedContent = content
    .replace(hashtagRegex, (hashtag) => {
      return renderToString(<ParsedHashTag hashtag={hashtag} />)
    })
    .replace(urlRegex, (url) => {
      if (urlImageRegex.test(url)) {
        return renderToString(<ParsedImage url={url} alt={url} />)
      }

      return renderToString(<ParsedLink url={url} />)
    })

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
}
