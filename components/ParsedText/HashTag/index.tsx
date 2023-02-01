import Link from 'next/link'

export default function ParsedHashTag({ hashtag }: { hashtag: string }) {
  return (
    <Link
      href={hashtag}
      className="text-blue-700 dark:text-carolinablue dark:hover:opacity-90 hover:opacity-70"
      target="_blank"
      rel="noreferrer"
    >
      {hashtag}
    </Link>
  )
}
