"use client";
import { ChatBox } from "@/components/comps/ChatBox";
import { RecentQueries } from "@/components/comps/RecentQueries";
import Link from "next/link";
import { useState, useRef } from "react";
import { Message } from "@/types";
import { ChatMessages } from "@/components/comps/ChatMessage";
import { Button } from "@/components/ui/button";


export default function AssistantPage() {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [caseId, setCaseId] = useState("general");
  const [jurisdiction, setJurisdiction] = useState("US");
  const [input, setInput] = useState("")
  
  
  async function handleSend(message: string) {
    setMessages(prev => [...prev, { role: "user", content: message }]);
    setIsLoading(true)
    setStreamingContent("")
    
    abortControllerRef.current = new AbortController()
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        user_id: "temp-user-id",
        case_id: caseId,
        jurisdiction: jurisdiction
      }),
      signal: abortControllerRef.current.signal
    })
    
    const returnedCaseId = response.headers.get("X-Case-Id")
    if (returnedCaseId && !caseId) setCaseId(returnedCaseId)
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let full = ""
    
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break
      const chunk = decoder.decode(value);
      full += chunk
      setStreamingContent(full)
    }
    
    setMessages(prev => [...prev, { role: "assistant", content: full }])
    setStreamingContent("")
    setIsLoading(false)
  }
  
  function handleStop() {
    abortControllerRef.current?.abort()
    setStreamingContent("")
    setIsLoading(false)
    setMessages(prev => {
      const lastUserMessage = prev[prev.length - 1]
      setInput(lastUserMessage.content)
      return prev.slice(0, -1)
    })
  }
  
  const hasStarted = messages.length > 0 || streamingContent !== ""
  
  
  return (
    <div className="flex flex-col relative h-full w-full justify-start items-center p-3.5 overflow-hidden">
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
      {/* Messages area — grows when chat starts */}
      <div className={`flex flex-1 w-full justify-center overflow-y-auto transition-all duration-300 scrollbar-hide ${
        hasStarted ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChatMessages
          isLoading={isLoading}
          messages={messages}
          streamingContent={streamingContent}
        />
      </div>
      <div className={`transition-all duration-500 ease-in-out flex flex-col items-center gap-4 ${
        hasStarted ? "absolute bottom-4 w-full px-4" : "absolute top-1/3 w-full px-4"
        }`}
      >
        <ChatBox
          onSend={handleSend}
          isLoading={isLoading}
          jurisdiction={jurisdiction}
          onJurisdictionChange={setJurisdiction}
          input={input}
          onInputChange={setInput}
          handleStopStream={handleStop}
        />
      </div>
      <div className={`flex justify-center transition-all duration-300 w-full
        ${hasStarted ? "opacity-0 pointer-events-none h-0 overflow-hidden" : "absolute top-2/3 px-5 left-1/2 -translate-x-1/2 opacity-100"
        }`}
      >
        <RecentQueries />
      </div>
    </div>
  )
}