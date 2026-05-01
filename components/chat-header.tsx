"use client"

import { Share2, Info, PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChatHeaderProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
}

export function ChatHeader({ onToggleSidebar, isSidebarOpen }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {!isSidebarOpen && (
            <Button size="icon" variant="ghost" onClick={onToggleSidebar}>
              <PanelLeft className="h-5 w-5" />
            </Button>
          )}
          <Select defaultValue="gpt-4">
            <SelectTrigger className="w-[180px] border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
              <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
              <SelectItem value="gpt-5">GPT-5 (Beta)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
