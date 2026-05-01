"use client"

import { Plus, PanelLeftClose, MoreHorizontal, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
}

interface ChatSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const MOCK_HISTORY: ChatHistory[] = [
  { id: "1", title: "Build a React dashboard", timestamp: new Date() },
  { id: "2", title: "Explain quantum computing", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: "3", title: "Write a Python script", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) },
  { id: "4", title: "Design system architecture", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: "5", title: "Review code patterns", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
  { id: "6", title: "Database optimization tips", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
]

function groupChatsByTime(chats: ChatHistory[]) {
  const now = new Date()
  const today: ChatHistory[] = []
  const yesterday: ChatHistory[] = []
  const previous7Days: ChatHistory[] = []
  const older: ChatHistory[] = []

  chats.forEach((chat) => {
    const diff = now.getTime() - chat.timestamp.getTime()
    const daysDiff = diff / (1000 * 60 * 60 * 24)

    if (daysDiff < 1) {
      today.push(chat)
    } else if (daysDiff < 2) {
      yesterday.push(chat)
    } else if (daysDiff < 7) {
      previous7Days.push(chat)
    } else {
      older.push(chat)
    }
  })

  return { today, yesterday, previous7Days, older }
}

export function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const { today, yesterday, previous7Days, older } = groupChatsByTime(MOCK_HISTORY)

  return (
    <aside
      className={cn("h-screen border-r border-border bg-card transition-all duration-300", isOpen ? "w-64" : "w-0")}
    >
      <div className={cn("flex h-full flex-col", !isOpen && "hidden")}>
        {/* Top Section - New Chat Button */}
        <div className="flex items-center justify-between gap-2 p-3 border-b border-border">
          <Button className="flex-1 justify-start gap-2 bg-transparent" variant="outline">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
          <Button size="icon" variant="ghost" onClick={onToggle}>
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* Middle Section - Chat History */}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-4 py-4">
            {today.length > 0 && (
              <div className="space-y-1">
                <h3 className="px-2 text-xs font-medium text-muted-foreground">Today</h3>
                {today.map((chat) => (
                  <Button key={chat.id} variant="ghost" className="w-full justify-start text-sm font-normal truncate">
                    <span className="truncate">{chat.title}</span>
                  </Button>
                ))}
              </div>
            )}

            {yesterday.length > 0 && (
              <div className="space-y-1">
                <h3 className="px-2 text-xs font-medium text-muted-foreground">Yesterday</h3>
                {yesterday.map((chat) => (
                  <Button key={chat.id} variant="ghost" className="w-full justify-start text-sm font-normal truncate">
                    <span className="truncate">{chat.title}</span>
                  </Button>
                ))}
              </div>
            )}

            {previous7Days.length > 0 && (
              <div className="space-y-1">
                <h3 className="px-2 text-xs font-medium text-muted-foreground">Previous 7 Days</h3>
                {previous7Days.map((chat) => (
                  <Button key={chat.id} variant="ghost" className="w-full justify-start text-sm font-normal truncate">
                    <span className="truncate">{chat.title}</span>
                  </Button>
                ))}
              </div>
            )}

            {older.length > 0 && (
              <div className="space-y-1">
                <h3 className="px-2 text-xs font-medium text-muted-foreground">Older</h3>
                {older.map((chat) => (
                  <Button key={chat.id} variant="ghost" className="w-full justify-start text-sm font-normal truncate">
                    <span className="truncate">{chat.title}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Bottom Section - User Profile */}
        <div className="border-t border-border p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start text-sm">
                  <span className="font-medium">John Doe</span>
                </div>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Custom Instructions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}
