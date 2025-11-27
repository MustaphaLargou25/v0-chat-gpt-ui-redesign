# Project Architecture Report

## 1. Executive Summary

**Application Name:** MaroChat
**Purpose:** MaroChat is a modern, AI-powered chat interface designed to mimic the experience of advanced LLM chat applications (like ChatGPT). It allows users to interact with various open-source Large Language Models (LLMs) such as Llama 3, Qwen, and GPT-OSS variants.
**Domain:** Artificial Intelligence / Conversational UI.
**Key Functionality:**
-   Real-time chat interface with AI models.
-   Model selection (switching between different LLMs).
-   Responsive sidebar and chat layout.
-   Dark mode support.
-   Integration with Groq API for high-speed inference.

## 2. Technology Stack & Dependencies

### Core Framework
-   **Framework:** Next.js v16.0.3
-   **Router:** App Router (`app/` directory).
-   **Language:** TypeScript.

### Backend & Database
-   **Backend Logic:** Next.js API Routes (`app/api`).
-   **Database:** None. The application is currently stateless regarding persistent data storage.
-   **ORM:** None.
-   **External Services:**
    -   **Groq API:** Used for LLM inference (OpenAI-compatible endpoint).
    -   **Vercel Analytics:** For tracking application usage.

### State Management
-   **Client-Side:** React `useState` and `useEffect` (Local State).
-   **Persistence:** `localStorage` is used to persist the selected model preference. Chat history is ephemeral (lost on refresh).

### Styling
-   **CSS Framework:** Tailwind CSS v4.
-   **Component Library:** Shadcn/UI (built on Radix UI Primitives).
-   **Icons:** Lucide React.
-   **Utilities:** `clsx`, `tailwind-merge`, `class-variance-authority` (CVA).

## 3. Project Structure & Architecture

### File Tree Overview
```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # Main API endpoint for chat
│   ├── layout.tsx          # Root layout (Fonts, Analytics, Theme)
│   └── page.tsx            # Main application logic & UI composition
├── components/
│   ├── ui/                 # Shadcn/UI reusable components (Button, Input, etc.)
│   ├── chat-*.tsx          # Feature-specific components (Sidebar, Message, Input)
│   └── theme-provider.tsx  # Theme context provider
├── lib/
│   ├── models.ts           # Model definitions and configuration
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Helper functions (cn)
└── public/                 # Static assets
```

### Key Architectures
-   **Monolithic Frontend:** The application is a single Next.js project handling both UI and API proxying.
-   **Component-Based Architecture:** The UI is broken down into granular, functional components (`ChatSidebar`, `ChatHeader`, `ChatMessage`) located in the `components/` directory.
-   **Stateless API Proxy:** The backend acts primarily as a secure proxy to the Groq API, hiding the API key from the client.

### Entry Points
-   **`app/layout.tsx`**: The root wrapper. It configures the `Geist` fonts, global CSS, and Vercel Analytics. It also hardcodes the `dark` class for styling.
-   **`app/page.tsx`**: The main view. It orchestrates the entire chat experience, managing the state for messages, input, and sidebar visibility.

## 4. Backend & API Logic

### API Routes
-   **`POST /api/chat`**:
    -   Receives a list of messages and a selected model ID.
    -   Validates the `GROQ_API_KEY` environment variable.
    -   Forwards the request to `https://api.groq.com/openai/v1/chat/completions`.
    -   Returns the full JSON response from Groq (non-streaming in the current implementation).

### Server Actions
-   **None detected.** The application relies on standard API Routes (`route.ts`) rather than Next.js Server Actions.

### Authentication
-   **None implemented.** The application is open and does not require user login.
-   **Security:** The only security measure is the server-side storage of the `GROQ_API_KEY`.

### Middleware
-   **None detected.** There is no `middleware.ts` file, meaning there is no global request interception for auth or redirects.

## 5. Database Schema Analysis

-   **Status:** No database is connected.
-   **Schema:** N/A.
-   **Data Model (In-Memory/Types):**
    -   `Message`: `{ id: string, role: 'user' | 'assistant', content: string }`
    -   `ModelConfig`: `{ id: string, name: string, provider: string, size: string, description: string }`

## 6. Key Code Patterns

-   **Manual Fetching:** The application uses native `fetch` and `AbortController` in `page.tsx` to handle API requests, rather than using the `useChat` hook from the installed `ai` SDK.
-   **Prop Drilling:** State (like `isSidebarOpen`, `messages`) is defined in `page.tsx` and passed down to children components (`ChatSidebar`, `ChatHeader`).
-   **Utility-First Styling:** Extensive use of Tailwind CSS utility classes combined with `cn()` helper for conditional styling.
-   **Configuration as Code:** Supported models are hardcoded in `lib/models.ts` rather than fetched from a database or API.

## 7. Recommendations

### 1. Implement Streaming Responses
**Current Issue:** The chat waits for the full response from Groq before displaying it, which can feel slow.
**Recommendation:** Refactor `app/api/chat/route.ts` and `app/page.tsx` to use the Vercel AI SDK's `streamText` and `useChat` hook. This will enable real-time token streaming, significantly improving perceived performance.

### 2. Add State Persistence & Database
**Current Issue:** Chat history is lost when the browser is refreshed.
**Recommendation:** Integrate a database (like PostgreSQL with Prisma or Drizzle) to store conversations. Even without a full DB, using `localStorage` for the `messages` array (not just the model) would be a quick win for session persistence.

### 3. Refactor to "useChat" Hook
**Current Issue:** The `sendMessage` logic in `page.tsx` is complex and manually handles loading states, abort signals, and error handling.
**Recommendation:** Replace the manual `fetch` logic with the `useChat` hook from the `ai/react` library (which is already in `package.json`). This simplifies the code, handles streaming automatically, and provides built-in state management for messages and input.
