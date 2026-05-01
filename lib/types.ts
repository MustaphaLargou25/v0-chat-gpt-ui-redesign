export interface Message {
 id: string
 role: "user" | "assistant"
 content: string
}

export interface ModelConfig {
 id: string
 name: string
 provider: string
 size?: string
 description?: string
}

export interface ChatRequest {
 messages: Message[]
 model: string
 temperature?: number
 max_tokens?: number
}

export interface ChatResponse {
 content: string
 model: string
}
