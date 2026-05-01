"use client"

import { Copy, ThumbsUp, ThumbsDown, User, Check, RefreshCw } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { Message } from '@/lib/types'

interface ChatMessageProps {
 message: Message
 isLatest?: boolean // Added prop to identify latest message for animation
}

export function ChatMessage({ message, isLatest = false }: ChatMessageProps) {
 const isUser = message.role === "user"
 const [copied, setCopied] = useState(false)
 const [displayedContent, setDisplayedContent] = useState("")
 const [isTyping, setIsTyping] = useState(false)
 const previousContentRef = useRef("")

 useEffect(() => {
 if (isUser) {
 setDisplayedContent(message.content)
 return
 }

 // If this is the latest assistant message, animate new content
 if (isLatest && message.content) {
 const newContent = message.content
 const previousContent = previousContentRef.current

 // Only animate if content has grown (streaming)
 if (newContent.startsWith(previousContent) && newContent.length > previousContent.length) {
 const newPart = newContent.slice(previousContent.length)
 let charIndex = 0
 setIsTyping(true)

 const typeNextChar = () => {
 if (charIndex < newPart.length) {
 setDisplayedContent(previousContent + newPart.slice(0, charIndex + 1))
 charIndex++
 setTimeout(typeNextChar, 15) // Typing speed
 } else {
 setIsTyping(false)
 previousContentRef.current = newContent
 }
 }

 typeNextChar()
 } else {
 // Content reset or initial load
 setDisplayedContent(newContent)
 previousContentRef.current = newContent
 }
 } else {
 // Not latest message, show full content immediately
 setDisplayedContent(message.content)
 previousContentRef.current = message.content
 }
 }, [message.content, isUser, isLatest])

 const handleCopy = () => {
 navigator.clipboard.writeText(message.content)
 setCopied(true)
 setTimeout(() => setCopied(false), 2000)
 }

 const [liked, setLiked] = useState(false)
 const [disliked, setDisliked] = useState(false)

 const handleLike = () => {
 if (liked) {
 setLiked(false)
 } else {
 setLiked(true)
 setDisliked(false) // Can't like and dislike at the same time
 }
 }

 const handleDislike = () => {
 if (disliked) {
 setDisliked(false)
 } else {
 setDisliked(true)
 setLiked(false) // Can't like and dislike at the same time
 }
 }

 return (
 <div className={cn("group relative flex gap-4 px-4 py-6", isUser ? "bg-background" : "bg-muted/30")}>
 <div className="flex w-full max-w-3xl mx-auto gap-4">
 <Avatar className="h-8 w-8 shrink-0">
 {isUser ? (
 <>
 <AvatarFallback className="bg-primary text-primary-foreground">
 <User className="h-4 w-4" />
 </AvatarFallback>
 </>
 ) : (
 <>
 <AvatarFallback className="bg-emerald-600 text-white">AI</AvatarFallback>
 </>
 )}
 </Avatar>

 <div className="flex-1 space-y-3 min-w-0">
 <div className="font-medium text-sm text-muted-foreground">{isUser ? "You" : "Assistant"}</div>
 <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap break-words">
 {displayedContent || <span className="text-muted-foreground italic">Thinking...</span>}
 {isTyping && <span className="inline-block w-0.5 h-4 bg-emerald-500 ml-0.5 animate-pulse" />}
 </div>

 {!isUser && message.content && !isTyping && (
 <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
 <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleCopy}>
 {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
 </Button>
 <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleLike}>
 <ThumbsUp className={cn("h-3.5 w-3.5", liked && "fill-current text-blue-500")} />
 </Button>
 <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleDislike}>
 <ThumbsDown className={cn("h-3.5 w-3.5", disliked && "fill-current text-red-500")} />
 </Button>
 <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => console.log('Regenerate response')}>
 <RefreshCw className="h-3.5 w-3.5" />
 </Button>
 </div>
 )}

 {isUser && message.content && (
 <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
 <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleCopy}>
 {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
 </Button>
 </div>
 )}
 </div>
 </div>
 </div>
 )
}
