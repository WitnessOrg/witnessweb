"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus, Globe, FolderOpen, Vault, CircleStop
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useWebHaptics } from "web-haptics/react";

import { SUPPORTED_COUNTRIES } from "@/constants/countries";
import Image from "next/image";


type Props = {
  onSend: (message: string) => void
  isLoading: boolean
  jurisdiction: string
  onJurisdictionChange: (jurisdiction: string) => void
  input: string
  onInputChange: (value: string) => void
  handleStopStream: () => void
}


export function ChatBox({ onSend, isLoading, jurisdiction, onJurisdictionChange, input, onInputChange, handleStopStream }: Props) {
  
  const { trigger } = useWebHaptics();
  
  
  return (
    <div className="relative flex flex-col w-140 h-25 border border-[#D9D9D9] rounded-xl bg-[#F2F2F2]">
      <textarea
        autoFocus
        placeholder="Ask witness anything"
        className="relative p-1.25 font-sans tracking-[-0.05em] text-sm resize-none border-0 outline-0 w-full bg-transparent placeholder:text-sm"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (!input.trim() || isLoading) return
            onSend(input)
          }
        }}
      >
      </textarea>
      <div className="absolute flex justify-between items-center w-full right-0 bottom-1.5 pl-1.25 pr-1.25">
        <div className="flex items-center">
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
                <Image src="/Dropbox.png" width={16} height={16} alt="dropbox logo" />
                <span className="font-sans tracking-[-0.05em] text-xs font-normal">Upload files from dropbox</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Image src="/google_drive.png" width={15} height={15} alt="google drive logo" />
                <span className="font-sans tracking-[-0.05em] text-xs font-normal">Upload files from google drive</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="xs" variant="ghost" className="rounded-full">
                <Image src={`https://flagsapi.com/${jurisdiction}/flat/16.png`} alt={`${jurisdiction} flag`} width={16} height={16} preload={true} />
                <span className="font-sans tracking-[-0.05em] text-xs">{jurisdiction}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {SUPPORTED_COUNTRIES.map((country, index) => (
                <DropdownMenuItem key={index} onClick={() => onJurisdictionChange(country.code)}>
                  <Image src={`https://flagsapi.com/${country.code}/flat/16.png`} alt={`${country.name} flag`} width={16} height={16} preload={true} />
                  <span className="font-sans tracking-[-0.05em] text-xs font-normal">{country.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          {isLoading ? <Button size="icon-xs" onClick={() => {
            trigger([
              { duration: 40 }
            ])
            handleStopStream()
          }}>
            <CircleStop />
          </Button>
            :
            <Button size="xs" className="" onClick={() => {
              trigger([
                { duration: 15 },
              ], { intensity: 0.4 })
              onSend(input)
              onInputChange("")
            }}>
            <span className="font-sans tracking-[-0.05em] font-normal text-xs">Ask witness</span>
          </Button>}
        </div>
      </div>
    </div>
  )
}