"use client"

import { useRef, useEffect } from "react"
import { ChatMessage } from "./chat-message"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Small delay to ensure content is rendered before scrolling
    const timeoutId = setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [messages, isLoading])

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current && isLoading) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    }, 200)

    return () => clearInterval(interval)
  }, [isLoading])

  const lastAssistantIndex = messages.reduce((lastIdx, msg, idx) => (msg.role === "assistant" ? idx : lastIdx), -1)

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide"
      style={{
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE and Edge */,
      }}
    >
      <div className="space-y-0">
        {messages.map((message, index) => (
          <ChatMessage key={message.id} message={message} isLatest={index === lastAssistantIndex} />
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-4 px-4 py-6 bg-muted/30">
            <div className="flex w-full max-w-3xl mx-auto gap-4">
              <div className="h-8 w-8 shrink-0 rounded-full bg-primary/20 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  )
}
