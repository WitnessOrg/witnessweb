import { ChatBox } from "@/components/comps/ChatBox";
import { RecentQueries } from "@/components/comps/RecentQueries";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AssistantPage() {
  return (
    <div className="flex flex-col h-full w-full justify-start items-center p-3.5">
      <div className="flex justify-between items-center w-full">
        <Button variant="ghost" className="" size="xs" asChild>
          <Link href={`/links`}>
            <span className="font-sans text-sm tracking-[-0.05em] font-normal">Chat name or title</span>
          </Link>
        </Button>
        <div className="flex gap-x-2.5">
          <Button size="xs" className="">
            <span className="font-sans text-xs font-medium tracking-[-0.05em]">Share</span>
          </Button>
        </div>
      </div>
      <div className="absolute top-24">
        <ChatBox />
      </div>
      <div className="absolute top-60 w-210">
        <RecentQueries />
      </div>
    </div>
  )
}