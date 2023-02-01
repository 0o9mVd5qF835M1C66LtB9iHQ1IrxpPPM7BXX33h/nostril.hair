import Link from 'next/link'

export default function ParsedLink({ url }: { url: string }) {
  return (
    <Link
      className="text-blue-700 dark:text-carolinablue hover:opacity-90"
      href={url}
      target="_blank"
    >
      {url}
    </Link>
  )
}
