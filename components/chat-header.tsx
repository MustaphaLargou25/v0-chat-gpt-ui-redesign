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
 <div className="flex h-14 items-center justify-between px-4">
 <div className="flex items-center gap-3">
 {!isSidebarOpen && (
 <Button size="icon" variant="ghost" onClick={onToggleSidebar}>
 <PanelLeft className="h-5 w-5" />
 </Button>
 )}
 <Select value={selectedModel} onValueChange={onModelChange}>
 <SelectTrigger className="w-[200px] border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
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

 {/* Right side - Auth buttons */}
 <div className="flex items-center gap-2">
 {/* Log in Button */}
 <Button
 variant="ghost"
 onClick={() => console.log('Login clicked')}
 >
 Log in
 </Button>

 {/* Sign up Button */}
 <Button
 onClick={() => console.log('Sign up clicked')}
 >
 Sign up for free
 </Button>
 </div>
 </div>
 </header>
 )
}
