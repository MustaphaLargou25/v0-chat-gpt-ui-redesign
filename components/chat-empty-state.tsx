"use client"

import { MessageSquare } from "lucide-react"

export function ChatEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 pb-8">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
        <MessageSquare className="h-10 w-10 text-emerald-500" />
      </div>
      <h1 className="text-3xl font-semibold text-foreground">How can I help you today?</h1>
    </div>
  )
}
