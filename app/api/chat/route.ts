export const maxDuration = 60

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return Response.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 })
  }

  try {
    const body = await req.json()
    const { messages } = body

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages.map((msg: { role: string; content: string }) => ({
          role: msg.role,
          content: msg.content,
        })),
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.log("[v0] Groq API error:", groqResponse.status, errorText)
      return Response.json({ error: `Groq API error: ${errorText}` }, { status: groqResponse.status })
    }

    const data = await groqResponse.json()
    const content = data.choices?.[0]?.message?.content || ""

    return Response.json({ content })
  } catch (error) {
    console.log("[v0] Server error:", error)
    return Response.json({ error: `Server error: ${(error as Error).message}` }, { status: 500 })
  }
}
