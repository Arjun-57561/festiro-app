import { NextResponse } from "next/server"
import Groq from "groq-sdk"

/*
  Production-ready multi-LLM API handler for FestiRo
  
  Supported models:
  - Groq (Llama 3.3) - Ultra-fast inference (primary)
  - Google Gemini 2.0 Flash (secondary, cloud)
*/

// Configuration
const REQUEST_TIMEOUT = 30000 // 30 seconds
const MAX_TOKENS = 500

// Festival assistant system prompt
const FESTIRO_PROMPT = `You are FestiRo, a cultural calendar assistant specializing in Indian festivals, auspicious dates (muhurat), and cultural celebrations. Provide helpful, accurate, and culturally sensitive information about festivals, traditions, and celebrations.`

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// Timeout utility
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const { message, context } = await request.json()

    // Input validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid message. Please provide a non-empty string." },
        { status: 400 }
      )
    }

    const model = context?.model?.toLowerCase() || "groq"
    let reply = ""
    let error = null

    // 1️⃣ Groq (Primary - Ultra Fast)
    if (model === "groq") {
      const GROQ_API_KEY = process.env.GROQ_API_KEY

      if (!GROQ_API_KEY) {
        return NextResponse.json(
          { error: "Groq API key not configured" },
          { status: 500 }
        )
      }

      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: FESTIRO_PROMPT,
            },
            {
              role: "user",
              content: message,
            },
          ],
          model: "llama-3.3-70b-versatile", // Fast and powerful
          temperature: 0.7,
          max_tokens: MAX_TOKENS,
          top_p: 0.95,
        })

        reply =
          chatCompletion.choices[0]?.message?.content ||
          "No response from Groq."
      } catch (err: any) {
        console.error("Groq Error:", err)
        error = `Groq error: ${err.message}`
        reply = "Failed to get response from Groq model."
      }
    }

    // 2️⃣ Google Gemini (Secondary - Reliable)
    else if (model === "gemini") {
      const GEMINI_API_KEY = process.env.GEMINI_API_KEY

      if (!GEMINI_API_KEY) {
        return NextResponse.json(
          { error: "Gemini API key not configured" },
          { status: 500 }
        )
      }

      const geminiModel = "gemini-2.0-flash-exp"

      try {
        const geminiResponse = await fetchWithTimeout(
          `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `${FESTIRO_PROMPT}\n\nUser question: ${message}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: MAX_TOKENS,
                topP: 0.95,
              },
            }),
          },
          REQUEST_TIMEOUT
        )

        if (!geminiResponse.ok) {
          const errorData = await geminiResponse.json().catch(() => ({}))
          console.error("Gemini Error:", errorData)
          throw new Error(
            errorData.error?.message || `HTTP ${geminiResponse.status}`
          )
        }

        const geminiData = await geminiResponse.json()
        reply =
          geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from Gemini."
      } catch (err: any) {
        console.error("Gemini Error:", err)
        error = `Gemini error: ${err.message}`
        reply = "Failed to get response from Gemini model."
      }
    }

    // Invalid model
    else {
      return NextResponse.json(
        {
          error: `Invalid model: ${model}. Use 'groq' or 'gemini'.`,
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      intent: "chat",
      confidence: error ? 0 : 1,
      reply,
      model,
      error: error || undefined,
      rag_hits: [],
      timestamp: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error("API Route Error:", err)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err.message,
        intent: "chat",
        confidence: 0,
        reply: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    )
  }
}
