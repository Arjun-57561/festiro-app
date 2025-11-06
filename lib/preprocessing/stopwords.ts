// lib/preprocessing/stopwords.ts

const ENGLISH_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by',
  'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of',
  'on', 'or', 'that', 'the', 'to', 'was', 'will', 'with',
  'this', 'what', 'when', 'where', 'why', 'how', 'if'
])

const FESTIVAL_STOPWORDS = new Set([
  'festival', 'celebrate', 'celebration', 'tradition'
  // Keep these as they're important for festival context
])

export function removeStopwords(tokens: string[]): string[] {
  return tokens.filter(token => {
    // Keep festival-specific words
    if (FESTIVAL_STOPWORDS.has(token)) return true
    // Remove general stopwords
    return !ENGLISH_STOPWORDS.has(token)
  })
}

export interface StopwordMetrics {
  originalTokens: number
  filteredTokens: number
  stopwordsRemoved: number
  reductionPercentage: number
}

export function getStopwordMetrics(tokens: string[]): StopwordMetrics {
  const filtered = removeStopwords(tokens)
  const removed = tokens.length - filtered.length
  
  return {
    originalTokens: tokens.length,
    filteredTokens: filtered.length,
    stopwordsRemoved: removed,
    reductionPercentage: Math.round((removed / tokens.length) * 100)
  }
}
