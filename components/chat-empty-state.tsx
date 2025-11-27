"use client"

import { MessageSquare } from "lucide-react"

interface ChatEmptyStateProps {
  onSuggestionClick?: (suggestion: string) => void
}

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-4">

      <h1 className="text-3xl font-semibold text-foreground">How can I help you today?</h1>
    </div>
  )
}
