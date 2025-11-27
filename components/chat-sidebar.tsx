"use client"

import {
  Plus,
  PanelLeftClose,
  MessageSquare,
  Search,
  Library,
  FolderKanban,
  Sparkles,
  Presentation,
  Code2,
  Palette,
  FileText,
  MessageCircle,
  ChevronRight,
  Crown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
}

interface ChatSidebarProps {
  isOpen: boolean
  onToggle: () => void
  onNewChat?: () => void
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

export function ChatSidebar({ isOpen, onToggle, onNewChat }: ChatSidebarProps) {
  const { today, yesterday, previous7Days, older } = groupChatsByTime(MOCK_HISTORY)

  return (
    <aside
      className={cn("h-screen border-r border-border bg-sidebar transition-all duration-300", isOpen ? "w-64" : "w-0")}
    >
      <div className={cn("flex h-full flex-col", !isOpen && "hidden")}>
        {/* Top Section - Logo & Collapse */}
        <div className="relative px-3 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="https://i.ibb.co/BH6qTZLv/icon-512.png"
                alt="MaroChat Logo"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <MessageSquare className="h-5 w-5 text-white hidden" />
            </div>
            <span className="font-semibold text-lg">MaroChat</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="absolute top-4 right-3 h-8 w-8"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Section */}
        <div className="px-2 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10"
            onClick={onNewChat}
          >
            <Plus className="h-4 w-4" />
            <span>New chat</span>
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-3 h-10">
            <Search className="h-4 w-4" />
            <span>Search chats</span>
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-3 h-10">
            <Library className="h-4 w-4" />
            <span>Library</span>
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-3 h-10">
            <FolderKanban className="h-4 w-4" />
            <span>Projects</span>
          </Button>
        </div>


        {/* Chat History Section */}
        <ScrollArea className="flex-1 px-2 sidebar-scrollbar">
          <div className="px-3 py-2 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Your chats
            </h3>
          </div>

          <div className="space-y-4 pb-4">
            {today.length > 0 && (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Today
                </div>
                {today.map((chat) => (
                  <Button
                    key={chat.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 px-3 h-9"
                  >
                    <MessageCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate text-sm">{chat.title}</span>
                  </Button>
                ))}
              </div>
            )}

            {yesterday.length > 0 && (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Yesterday
                </div>
                {yesterday.map((chat) => (
                  <Button
                    key={chat.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 px-3 h-9"
                  >
                    <MessageCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate text-sm">{chat.title}</span>
                  </Button>
                ))}
              </div>
            )}

            {previous7Days.length > 0 && (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Previous 7 Days
                </div>
                {previous7Days.map((chat) => (
                  <Button
                    key={chat.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 px-3 h-9"
                  >
                    <MessageCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate text-sm">{chat.title}</span>
                  </Button>
                ))}
              </div>
            )}

            {older.length > 0 && (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Older
                </div>
                {older.map((chat) => (
                  <Button
                    key={chat.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 px-3 h-9"
                  >
                    <MessageCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate text-sm">{chat.title}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Bottom Profile Section */}
        <div className="border-t p-3">
          <Button variant="ghost" className="w-full justify-between h-auto p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-sm">
                  JD
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  Free Plan
                </span>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Button
            variant="default"
            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            size="sm"
          >
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Plus
          </Button>
        </div>
      </div>
    </aside>
  )
}
