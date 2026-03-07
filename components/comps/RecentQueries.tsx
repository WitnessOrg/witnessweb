import Link from "next/link"; 

export function RecentQueries() {
  return (
    <div className="flex flex-col gap-y-2 items-start">
      <span className="font-sans tracking-[-0.05em] text-sm font-medium">Recent Issues</span>
      <div className="flex flex-col gap-y-1 items-start">
        <Link href="/" className="flex border-b justify-between p-1 w-210 items-center">
          <span className="font-sans tracking-[-0.05em] text-sm font-normal">A chat issue about insurance claims</span>
          <span className="font-sans tracking-[-0.05em] text-xs font-light">4 hours ago</span>
        </Link>
      </div>
    </div>
  )
}