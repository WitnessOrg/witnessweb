import { Button } from "@/components/ui/button";
import {
  Plus, Globe, FolderOpen, Vault
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import Image from "next/image";


export function ChatBox() {
  return (
    <div className="relative flex flex-col w-122.5 h-25 border border-[#D9D9D9] rounded-xl bg-[#F2F2F2]">
      <textarea
        autoFocus
        placeholder="Ask witness anything"
        className="relative p-1.25 font-sans tracking-[-0.05em] text-sm resize-none border-0 outline-0 w-full bg-transparent placeholder:text-sm"
      >
      </textarea>
      <div className="absolute flex justify-between items-center w-full right-0 bottom-1.5 pl-1.25 pr-1.25">
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" variant="ghost" size="icon-xs">
                <Plus />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FolderOpen />
                <span className="font-sans tracking-[-0.05em] text-xs font-normal">Upload files from local files</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Vault />
                <span className="font-sans tracking-[-0.05em] text-xs font-normal">Upload files from your vault</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Image src="/dropbox.png" width={16} height={16} alt="dropbox logo" />
                <span className="font-sans tracking-[-0.05em] text-xs font-normal">Upload files from dropbox</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Image src="/google_drive.png" width={16} height={16} alt="google drive logo" />
                <span className="font-sans tracking-[-0.05em] text-xs font-normal">Upload files from google drive</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="xs" variant="ghost" className="rounded-full">
            <Globe />
            <span className="font-sans tracking-[-0.05em] text-xs">Sources</span>
          </Button>
        </div>
        <div className="">
          <Button size="xs" className="">
            <span className="font-sans tracking-[-0.05em] font-normal text-xs">Ask witness</span>
          </Button>
        </div>
      </div>
    </div>
  )
}