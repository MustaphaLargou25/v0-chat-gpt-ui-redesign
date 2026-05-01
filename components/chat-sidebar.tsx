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
 className={cn("h-screen border-r border-border bg-sidebar transition-all duration-300 flex flex-col", isOpen ? "w-64" : "w-0")}
 >
 {/* Top Section - Logo & Collapse */}
 <div className="flex items-center justify-between gap-2 p-4 border-b border-sidebar-border">
 <Button
 size="icon"
 variant="ghost"
 className="shrink-0"
 onClick={() => {
 (document.currentTarget as HTMLElement).style.display = 'none'
 ;(document.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden')
 }}
 />
 <span className="font-semibold text-sidebar-foreground text-lg">MaroChat</span>
 <Button
 size="icon"
 variant="ghost"
 onClick={onToggle}
 className="shrink-0"
 >
 <PanelLeftClose className="h-4 w-4" />
 </Button>
 </div>

 {/* Navigation Section */}
 <div className="space-y-2 px-3 py-4 border-b border-sidebar-border">
 <Button
 onClick={onNewChat}
 className="w-full justify-start gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
 >
 <Plus className="h-4 w-4" />
 New chat
 </Button>

 <Button
 variant="ghost"
 className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
 >
 <Search className="h-4 w-4" />
 Search chats
 </Button>

 <Button
 variant="ghost"
 className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
 >
 <Library className="h-4 w-4" />
 Library
 </Button>

 <Button
 variant="ghost"
 className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
 >
 <FolderKanban className="h-4 w-4" />
 Projects
 </Button>
 </div>

 {/* Chat History Section */}
 <ScrollArea className="flex-1 sidebar-scrollbar">
 <div className="px-3 py-4">
 <h3 className="text-sm font-semibold text-sidebar-foreground mb-3">Your chats</h3>

 {today.length > 0 && (
 <div className="mb-4">
 <h4 className="text-xs font-medium text-sidebar-foreground/60 mb-2">Today</h4>
 {today.map((chat) => (
 <Button
 key={chat.id}
 variant="ghost"
 className="w-full justify-start text-sm font-normal truncate text-sidebar-foreground hover:bg-sidebar-accent"
 >
 <MessageCircle className="h-4 w-4 mr-2 shrink-0" />
 <span className="truncate">{chat.title}</span>
 </Button>
 ))}
 </div>
 )}

 {yesterday.length > 0 && (
 <div className="mb-4">
 <h4 className="text-xs font-medium text-sidebar-foreground/60 mb-2">Yesterday</h4>
 {yesterday.map((chat) => (
 <Button
 key={chat.id}
 variant="ghost"
 className="w-full justify-start text-sm font-normal truncate text-sidebar-foreground hover:bg-sidebar-accent"
 >
 <MessageCircle className="h-4 w-4 mr-2 shrink-0" />
 <span className="truncate">{chat.title}</span>
 </Button>
 ))}
 </div>
 )}

 {previous7Days.length > 0 && (
 <div className="mb-4">
 <h4 className="text-xs font-medium text-sidebar-foreground/60 mb-2">Previous 7 Days</h4>
 {previous7Days.map((chat) => (
 <Button
 key={chat.id}
 variant="ghost"
 className="w-full justify-start text-sm font-normal truncate text-sidebar-foreground hover:bg-sidebar-accent"
 >
 <MessageCircle className="h-4 w-4 mr-2 shrink-0" />
 <span className="truncate">{chat.title}</span>
 </Button>
 ))}
 </div>
 )}

 {older.length > 0 && (
 <div className="mb-4">
 <h4 className="text-xs font-medium text-sidebar-foreground/60 mb-2">Older</h4>
 {older.map((chat) => (
 <Button
 key={chat.id}
 variant="ghost"
 className="w-full justify-start text-sm font-normal truncate text-sidebar-foreground hover:bg-sidebar-accent"
 >
 <MessageCircle className="h-4 w-4 mr-2 shrink-0" />
 <span className="truncate">{chat.title}</span>
 </Button>
 ))}
 </div>
 )}
 </div>
 </ScrollArea>

 {/* Bottom Profile Section */}
 <div className="border-t border-sidebar-border p-3 space-y-2">
 <Button
 variant="ghost"
 className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
 >
 <Avatar className="h-6 w-6">
 <AvatarImage src="/diverse-user-avatars.png" />
 <AvatarFallback>JD</AvatarFallback>
 </Avatar>
 <div className="flex-1 text-left">
 <div className="text-sm font-medium">John Doe</div>
 <div className="text-xs text-sidebar-foreground/60">Free Plan</div>
 </div>
 </Button>

 <Button className="w-full justify-start gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
 <Crown className="h-4 w-4" />
 Upgrade to Plus
 </Button>
 </div>
 </aside>
 )
}
