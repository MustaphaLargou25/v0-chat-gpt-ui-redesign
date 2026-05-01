"use client"

import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SUPPORTED_MODELS, getModelDisplayName } from '@/lib/models'

interface ChatHeaderProps {
 onToggleSidebar: () => void
 isSidebarOpen: boolean
 selectedModel: string
 onModelChange: (model: string) => void
}

export function ChatHeader({ onToggleSidebar, isSidebarOpen, selectedModel, onModelChange }: ChatHeaderProps) {
 return (
 <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
 <div className="flex h-14 items-center justify-between px-3 sm:px-4">
 {/* Left side - Menu and Model selector */}
 <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
 <Button size="icon" variant="ghost" onClick={onToggleSidebar} className="shrink-0">
 <PanelLeft className="h-5 w-5" />
 </Button>
 
 {/* Model selector - hidden on mobile, visible on tablet+ */}
 <div className="hidden sm:block">
 <Select value={selectedModel} onValueChange={onModelChange}>
 <SelectTrigger className="w-auto max-w-xs border-0 bg-transparent focus:ring-0 focus:ring-offset-0 text-sm">
 <SelectValue placeholder="Select model" />
 </SelectTrigger>
 <SelectContent>
 {SUPPORTED_MODELS.map((model) => (
 <SelectItem key={model.id} value={model.id}>
 <div>
 <div>{model.name}</div>
 {model.description && (
 <div className="text-xs text-muted-foreground">{model.description}</div>
 )}
 </div>
 </SelectItem>
 ))}
 </SelectContent>
 </Select>
 </div>
 </div>

 {/* Right side - Auth buttons, responsive */}
 <div className="flex items-center gap-1 sm:gap-2 shrink-0">
 {/* Log in Button - text only on mobile */}
 <Button
 variant="ghost"
 onClick={() => console.log('Login clicked')}
 className="text-xs sm:text-sm px-2 sm:px-3"
 >
 <span className="hidden sm:inline">Log in</span>
 <span className="sm:hidden">Log in</span>
 </Button>

 {/* Sign up Button - responsive sizing */}
 <Button
 onClick={() => console.log('Sign up clicked')}
 className="text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
 >
 <span className="hidden sm:inline">Sign up for free</span>
 <span className="sm:hidden text-xs">Sign up</span>
 </Button>
 </div>
 </div>
 </header>
 )
}
