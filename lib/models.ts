import { ModelConfig } from './types'

export const SUPPORTED_MODELS: ModelConfig[] = [
    {
        id: "openai/gpt-oss-120b",
        name: "GPT-OSS 120B",
        provider: "groq",
        size: "120B",
        description: "Largest open-source model"
    },
    {
        id: "llama-3.3-70b-versatile",
        name: "Llama 3.3 70B",
        provider: "groq",
        size: "70B",
        description: "High performance versatile model"
    },
    {
        id: "qwen/qwen3-32b",
        name: "Qwen3 32B",
        provider: "groq",
        size: "32B",
        description: "Efficient Chinese-English model"
    },
    {
        id: "openai/gpt-oss-20b",
        name: "GPT-OSS 20B",
        provider: "groq",
        size: "20B",
        description: "Balanced performance model"
    },
    {
        id: "openai/gpt-oss-safeguard-20b",
        name: "GPT-OSS Safeguard 20B",
        provider: "groq",
        size: "20B",
        description: "Safety-focused model"
    },
    {
        id: "meta-llama/llama-4-maverick-17b-128e-instruct",
        name: "Llama 4 Maverick 17B",
        provider: "groq",
        size: "17B",
        description: "Llama 4 instruction model"
    },
    {
        id: "meta-llama/llama-4-scout-17b-16e-instruct",
        name: "Llama 4 Scout 17B",
        provider: "groq",
        size: "17B",
        description: "Fast instruction model"
    },
    {
        id: "meta-llama/llama-guard-4-12b",
        name: "Llama Guard 4 12B",
        provider: "groq",
        size: "12B",
        description: "Content moderation model"
    },
    {
        id: "llama-3.1-8b-instant",
        name: "Llama 3.1 8B Instant",
        provider: "groq",
        size: "8B",
        description: "Fast and efficient"
    },
    {
        id: "meta-llama/llama-prompt-guard-2-86m",
        name: "Llama Prompt Guard 86M",
        provider: "groq",
        size: "86M",
        description: "Prompt injection detection"
    },
    {
        id: "meta-llama/llama-prompt-guard-2-22m",
        name: "Llama Prompt Guard 22M",
        provider: "groq",
        size: "22M",
        description: "Lightweight guard model"
    },
    {
        id: "groq/compound",
        name: "Groq Compound",
        provider: "groq",
        description: "Mixture of Experts model"
    },
    {
        id: "groq/compound-mini",
        name: "Groq Compound Mini",
        provider: "groq",
        description: "Compact MoE model"
    },
    {
        id: "moonshotai/kimi-k2-instruct",
        name: "Kimi K2 Instruct",
        provider: "groq",
        description: "Moonshot AI model"
    },
    {
        id: "moonshotai/kimi-k2-instruct-0905",
        name: "Kimi K2 Instruct (0905)",
        provider: "groq",
        description: "Moonshot AI model version"
    }
]

export const DEFAULT_MODEL = "llama-3.1-8b-instant"

export function getModelById(id: string): ModelConfig | undefined {
    return SUPPORTED_MODELS.find(model => model.id === id)
}

export function getModelDisplayName(id: string): string {
    const model = getModelById(id)
    return model ? model.name : id
}
