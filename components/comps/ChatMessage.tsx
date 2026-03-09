"use client";
import { Message } from "@/types";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from "react";
import { ChatLoader } from "@/components/comps/ChatLoader";

type Props = {
  isLoading: boolean
  messages: Message[]
  streamingContent: string
}


export function ChatMessages({ isLoading, messages, streamingContent }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, streamingContent])

  return (
    <div className="flex flex-col h-full w-full gap-4 items-center pb-40 overflow-y-auto scrollbar-hide">
      {messages.map((msg, i) => (
        <div key={i} className={`flex w-140 max-w-140 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`rounded-2xl px-4 py-3 font-sans tracking-[-0.05em] text-sm ${
              msg.role === 'user' 
              ? 'bg-[#121212] text-white max-w-100'
              : 'bg-[#FFFFFF] text-[#121212] border border-[#D9D9D9] max-w-140'
              }`}
          >
            {msg.role === 'assistant' ? (
              <div className="prose prose-sm max-w-full prose-p:my-1 prose-headings:my-2 overflow-x-auto">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </Markdown>
              </div>
            ) : (<span className="max-w-full">{msg.content}</span>)}
          </div>
        </div>
      ))}
      
      {(isLoading && streamingContent == "") ?
        (<div className="flex justify-start w-140">
          <div className="rounded-2xl px-4 py-3 bg-[#F5F5F5] border border-[#D9D9D9]">
            <ChatLoader />
          </div>
        </div>)
        : streamingContent && (
        <div className="flex justify-start w-140">
          <div className="max-w-full rounded-2xl px-4 py-3 text-sm bg-[#FFFFFF] text-[#121212] border border-[#D9D9D9]">
            <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 overflow-x-auto">
              <Markdown remarkPlugins={[remarkGfm]}>
                {streamingContent}
              </Markdown>
              <div className="w-1 h-1 bg-[#121212] animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}