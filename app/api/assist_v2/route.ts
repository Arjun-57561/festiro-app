// app/api/assist_v2/route.ts
import { NextResponse } from "next/server"
import Groq from "groq-sdk"
import {
  isFestivalQuestion,
  validateResponse,
  getFestivalSuggestion,
  extractFestivalName,
  getFestivalCategory,
  getResponseLengthSuggestion,
} from "@/lib/festival-validator"


// Configuration
const REQUEST_TIMEOUT = 30000 // 30 seconds
const MAX_TOKENS = 800 // Increased for detailed festival info

// FestiRo-ONLY System Prompt (Stricter)
const FESTIRO_PROMPT = `You are FestiRo, an AI assistant EXCLUSIVELY specialized in Indian and world festivals, auspicious dates (muhurat), cultural celebrations, and related traditions.

CORE GUIDELINES:
1. ONLY answer questions about festivals, celebrations, rituals, and cultural traditions
2. Provide historically accurate, culturally sensitive information
3. Include specific dates, timings, and muhurat information when relevant
4. Explain the significance and traditions of festivals
5. Cover regional variations and lesser-known celebrations
6. If asked about non-festival topics, politely decline and redirect

RESPONSE FORMAT:
- Be concise yet informative (2-3 paragraphs)
- Use bullet points for lists
- Include emojis for visual appeal
- Add relevant dates and timings
- Suggest related festivals when appropriate

FESTIVAL KNOWLEDGE AREAS:
✅ Major Indian Festivals (Diwali, Holi, Navratri, Pongal, Onam)
✅ Regional & Tribal Festivals (Theyyam, Sekrenyi, Madai, Wangala)
✅ Religious Festivals (Hindu, Muslim, Christian, Sikh, Buddhist, Jain, Parsi)
✅ Harvest & Seasonal Festivals
✅ Muhurat & Auspicious Timings
✅ Festival Traditions & Rituals
✅ Historical & Cultural Significance

Always maintain cultural respect and provide authentic information.`

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

    // ===== INPUT VALIDATION =====
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid message. Please provide a non-empty string." },
        { status: 400 }
      )
    }

    // ===== FESTIVAL VALIDATION (NEW!) =====
    const isFestival = isFestivalQuestion(message)
    
    if (!isFestival) {
      return NextResponse.json({
        intent: "chat",
        confidence: 0,
        reply: `I appreciate your question, but I'm specialized ONLY in festivals and cultural celebrations! 🎊\n\n${getFestivalSuggestion()}\n\nExamples:\n• "When is Diwali 2025?"\n• "Tell me about Theyyam"\n• "What is a muhurat?"`,
        model: "festiro-validator",
        category: "rejected",
        reason: "Non-festival question",
        timestamp: new Date().toISOString(),
      })
    }

    // Extract metadata (for logging & context)
    const festivalName = extractFestivalName(message)
    const festivalCategory = getFestivalCategory(message)
    const responseLengthHint = getResponseLengthSuggestion(message)

    console.log(`🎊 Festival Question Detected:
      Festival: ${festivalName || "General"}
      Category: ${festivalCategory}
      Length Hint: ${responseLengthHint}
      Question: ${message}`)

    // ===== MODEL SELECTION =====
    const model = context?.model?.toLowerCase() || "groq"
    let reply = ""
    let error = null
    let usedModel = model

    // ===== 1️⃣ GROQ (Primary - Ultra Fast) =====
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
          model: "llama-3.3-70b-versatile",
          temperature: 0.6, // Lower for consistency
          max_tokens: MAX_TOKENS,
          top_p: 0.9,
          frequency_penalty: 0.5, // Reduce repetition
          presence_penalty: 0.3, // Encourage new content
        })

        reply =
          chatCompletion.choices[0]?.message?.content ||
          "No response from Groq."

        // Validate response quality
        const validation = validateResponse(message, reply)
        if (!validation.isValid && validation.message) {
          reply = validation.message
        }
      } catch (err: any) {
        console.error("❌ Groq Error:", err)
        error = `Groq error: ${err.message}`
        reply = "" // Trigger fallback to Gemini
        
      }
    }

    // ===== 2️⃣ GOOGLE GEMINI (Fallback - Reliable) =====
    if (!reply || model === "gemini") {
      const GEMINI_API_KEY = process.env.GEMINI_API_KEY

      if (!GEMINI_API_KEY) {
        return NextResponse.json(
          { error: "Gemini API key not configured" },
          { status: 500 }
        )
      }

      const geminiModel = "gemini-2.0-flash-exp"
      usedModel = "gemini"

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
                temperature: 0.6,
                maxOutputTokens: MAX_TOKENS,
                topP: 0.9,
              },
            }),
          },
          REQUEST_TIMEOUT
        )

        if (!geminiResponse.ok) {
          const errorData = await geminiResponse.json().catch(() => ({}))
          console.error("❌ Gemini Error:", errorData)
          throw new Error(
            errorData.error?.message || `HTTP ${geminiResponse.status}`
          )
        }

        const geminiData = await geminiResponse.json()
        reply =
          geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from Gemini."

        // Validate response quality
        const validation = validateResponse(message, reply)
        if (!validation.isValid && validation.message) {
          reply = validation.message
        }
      } catch (err: any) {
        console.error("❌ Gemini Error:", err)
        error = `Fallback Gemini error: ${err.message}`
        reply = "I encountered an error processing your festival question. Please try again."
      }
    }

    // ===== INVALID MODEL =====
    if (!reply && model !== "groq" && model !== "gemini") {
      return NextResponse.json(
        {
          error: `Invalid model: ${model}. Use 'groq' or 'gemini'.`,
        },
        { status: 400 }
      )
    }

    // ===== SUCCESS RESPONSE =====
    console.log(`✅ Successfully answered: ${message.substring(0, 50)}...`)

    return NextResponse.json({
      intent: "chat",
      confidence: error ? 0.7 : 1,
      reply: reply || "Unable to generate response",
      model: usedModel,
      festival: festivalName,
      category: festivalCategory,
      lengthHint: responseLengthHint,
      isFestivalQuestion: true,
      error: error || undefined,
      timestamp: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error("❌ API Route Error:", err)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err.message,
        intent: "chat",
        confidence: 0,
        reply: "An unexpected error occurred. Please try again.",
        isFestivalQuestion: false,
      },
      { status: 500 }
    )
  }
}
