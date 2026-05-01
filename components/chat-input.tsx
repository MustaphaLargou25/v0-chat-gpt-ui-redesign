"use client"

import type React from "react"
import { useRef, useState, useMemo } from "react"
import { Plus, Mic, Send } from "lucide-react"
import { getModelDisplayName } from '@/lib/models'

const AUTOCOMPLETE_SUGGESTIONS = [
 "is an interesting fact about space?",
 "is the latest trend in technology?",
 "is your favorite book and why?",
 "is the meaning of life?",
 "are some tips for productivity?",
 "is the best programming language to learn?",
 "are some healthy breakfast ideas?",
 "is the difference between AI and machine learning?",
 "can you tell me about quantum computing?",
 "are some good movies to watch?",
]

interface ChatInputProps {
 input: string
 handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
 handleSubmit: (e?: React.FormEvent) => void
 isLoading: boolean
 selectedModel?: string
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading, selectedModel }: ChatInputProps) {
 const inputRef = useRef<HTMLInputElement>(null)
 const [showSuggestions, setShowSuggestions] = useState(false)

 const filteredSuggestions = useMemo(() => {
 if (!input.trim() || input.length < 2) return []

 const lowerInput = input.toLowerCase().trim()

 // Match suggestions that make sense with the typed prefix
 const matches = AUTOCOMPLETE_SUGGESTIONS.filter((suggestion) => {
 const fullSuggestion = `${lowerInput} ${suggestion}`.toLowerCase()
 // Check if input could be start of common question words
 const questionStarters = ["what", "how", "why", "when", "where", "who", "can", "tell", "explain"]
 return questionStarters.some((starter) => starter.startsWith(lowerInput) || lowerInput.startsWith(starter))
 }).slice(0, 3)

 return matches
 }, [input])

 const handleSuggestionClick = (suggestion: string) => {
 const fullText = `${input.trim()} ${suggestion}`
 const syntheticEvent = {
 target: { value: fullText },
 } as React.ChangeEvent<HTMLInputElement>
 handleInputChange(syntheticEvent)
 setShowSuggestions(false)
 inputRef.current?.focus()
 }

 const onSubmit = (e: React.FormEvent) => {
 e.preventDefault()
 if (input.trim() && !isLoading) {
 handleSubmit(e)
 setShowSuggestions(false)
 }
 }

 const handleKeyDown = (e: React.KeyboardEvent) => {
 if (e.key === "Enter" && !e.shiftKey) {
 e.preventDefault()
 onSubmit(e)
 }
 if (e.key === "Escape") {
 setShowSuggestions(false)
 }
 }

 const handleFocus = () => {
 if (input.trim().length >= 2) {
 setShowSuggestions(true)
 }
 }

 const handleBlur = () => {
 // Delay to allow click on suggestion
 setTimeout(() => setShowSuggestions(false), 150)
 }

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 handleInputChange(e)
 setShowSuggestions(e.target.value.trim().length >= 2)
 }

 return (
 <div className="border-t border-border bg-background px-4 pb-6 pt-4">
 <div className="mx-auto max-w-3xl">
 <form onSubmit={onSubmit}>
 <div className="relative">
 <div className="flex items-center gap-3 rounded-full border border-foreground/20 bg-muted/50 px-4 py-3 focus-within:border-primary/50 transition-colors">
 <button
 type="button"
 className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
 >
 <Plus className="h-5 w-5" />
 </button>

 <input
 ref={inputRef}
 type="text"
 value={input}
 onChange={handleChange}
 onKeyDown={handleKeyDown}
 onFocus={handleFocus}
 onBlur={handleBlur}
 placeholder="Ask anything"
 disabled={isLoading}
 className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
 />

 <button
 type="button"
 className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
 >
 <Mic className="h-5 w-5" />
 </button>

 <button
 type="submit"
 disabled={isLoading || !input.trim()}
 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isLoading ? (
 <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
 ) : (
 <Send className="h-4 w-4" />
 )}
 </button>
 </div>

 {showSuggestions && filteredSuggestions.length > 0 && (
 <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-border bg-card shadow-lg overflow-hidden z-50">
 {filteredSuggestions.map((suggestion, index) => (
 <button
 key={index}
 type="button"
 onClick={() => handleSuggestionClick(suggestion)}
 className="w-full px-4 py-3 text-left text-sm hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
 >
 <span className="text-foreground">{input.trim()}</span>
 <span className="text-muted-foreground"> {suggestion}</span>
 </button>
 ))}
 </div>
 )}
 </div>
 </form>

 <p className="mt-3 text-center text-xs text-muted-foreground">
 Powered by Groq with {selectedModel ? getModelDisplayName(selectedModel) : 'default model'}. AI can make mistakes.
 </p>
 </div>
 </div>
 )
}
