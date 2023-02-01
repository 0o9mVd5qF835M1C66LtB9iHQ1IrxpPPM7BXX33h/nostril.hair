import Link from 'next/link'

export default function ParsedImage({ url }: { url: string; alt?: string }) {
  return (
    <Link href={url} target="_blank" className="my-3">
      <img src={url} className="max-w-full max-h-[378px] rounded-lg" alt={url} />
    </Link>
  )
}
