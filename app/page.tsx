"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatHeader } from "@/components/chat-header"
import { ChatEmptyState } from "@/components/chat-empty-state"
import { ChatMessages } from "@/components/chat-messages"
import { ChatInput } from "@/components/chat-input"
import { Message } from '@/lib/types'
import { SUPPORTED_MODELS, DEFAULT_MODEL } from '@/lib/models'

export default function Home() {
 const [isSidebarOpen, setIsSidebarOpen] = useState(true)
 const [messages, setMessages] = useState<Message[]>([])
 const [input, setInput] = useState("")
 const [isLoading, setIsLoading] = useState(false)
 const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL)
 const abortControllerRef = useRef<AbortController | null>(null)

 // Load model from localStorage on mount
 useEffect(() => {
 const savedModel = localStorage.getItem('selectedModel')
 if (savedModel) {
 setSelectedModel(savedModel)
 }
 }, [])

 // Save model to localStorage when changed
 useEffect(() => {
 localStorage.setItem('selectedModel', selectedModel)
 }, [selectedModel])

 const sendMessage = useCallback(
 async (messageContent: string, currentMessages: Message[]) => {
 if (!messageContent.trim() || isLoading) return

 const userMessage: Message = {
 id: Date.now().toString(),
 role: "user",
 content: messageContent.trim(),
 }

 const newMessages = [...currentMessages, userMessage]
 setMessages(newMessages)
 setInput("")
 setIsLoading(true)

 try {
 abortControllerRef.current = new AbortController()

 console.log("[v0] Sending request to /api/chat")

 const response = await fetch("/api/chat", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 messages: newMessages.map((m) => ({
 role: m.role,
 content: m.content,
 })),
 model: selectedModel,
 }),
 signal: abortControllerRef.current.signal,
 })

 console.log("[v0] Response status:", response.status)

 const text = await response.text()
 let data
 try {
 data = JSON.parse(text)
 } catch {
 throw new Error(`Invalid response from server: ${text.substring(0, 100)}`)
 }

 if (!response.ok) {
 throw new Error(data.error || "Failed to fetch response")
 }

 console.log("[v0] Response data received")

 const assistantMessage: Message = {
 id: (Date.now() + 1).toString(),
 role: "assistant",
 content: data.content,
 }

 setMessages((prev) => [...prev, assistantMessage])
 } catch (error) {
 if ((error as Error).name !== "AbortError") {
 console.error("[v0] Chat error:", (error as Error).message)
 const errorMessage: Message = {
 id: (Date.now() + 1).toString(),
 role: "assistant",
 content: `Sorry, an error occurred: ${(error as Error).message}. Please try again.`,
 }
 setMessages((prev) => [...prev, errorMessage])
 }
 } finally {
 setIsLoading(false)
 abortControllerRef.current = null
 }
 },
 [isLoading, selectedModel],
 )

 const handleSubmit = useCallback(
 async (e?: React.FormEvent) => {
 e?.preventDefault()
 await sendMessage(input, messages)
 },
 [input, messages, sendMessage],
 )

 const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 setInput(e.target.value)
 }, [])

 const handleSuggestionClick = useCallback(
 async (suggestion: string) => {
 await sendMessage(suggestion, messages)
 },
 [messages, sendMessage],
 )

 const handleNewChat = useCallback(() => {
 setMessages([])
 setInput("")
 }, [])

 return (
 <div className="flex h-screen overflow-hidden bg-background">
 <ChatSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onNewChat={handleNewChat} />

 <main className="flex flex-1 flex-col min-w-0">
 <ChatHeader 
 onToggleSidebar={() => setIsSidebarOpen(true)} 
 isSidebarOpen={isSidebarOpen}
 selectedModel={selectedModel}
 onModelChange={setSelectedModel}
 />

 <div className="flex flex-1 flex-col overflow-hidden">
 {messages.length === 0 ? (
 <ChatEmptyState onSuggestionClick={handleSuggestionClick} />
 ) : (
 <ChatMessages messages={messages} isLoading={isLoading} />
 )}

 <ChatInput
 input={input}
 handleInputChange={handleInputChange}
 handleSubmit={handleSubmit}
 isLoading={isLoading}
 selectedModel={selectedModel}
 />
 </div>
 </main>


 </div>
 )
}
