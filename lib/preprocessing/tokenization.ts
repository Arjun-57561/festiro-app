// lib/preprocessing/tokenization.ts

/**
 * Break text into tokens (words)
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(token => token.length > 0)
}

/**
 * Simple lemmatization for festival terms
 */
export function lemmatize(tokens: string[]): string[] {
  const lemmaMap: Record<string, string> = {
    // Festival variations
    'diwalis': 'diwali',
    'deepavali': 'diwali',
    'celebrating': 'celebrate',
    'celebrates': 'celebrate',
    'celebrated': 'celebrate',
    'traditions': 'tradition',
    'rituals': 'ritual',
    'celebrations': 'celebration',
    'festivals': 'festival',
    'auspicious': 'auspicious',
    'muhurat': 'muhurat',
    'muhurats': 'muhurat'
  }
  
  return tokens.map(token => lemmaMap[token] || token)
}

export interface TokenizationMetrics {
  tokenCount: number
  uniqueTokens: number
  avgTokenLength: number
  processingTime: number
}

export function getTokenizationMetrics(text: string): TokenizationMetrics {
  const start = performance.now()
  
  const tokens = tokenize(text)
  const lemmas = lemmatize(tokens)
  const uniqueTokens = new Set(lemmas).size
  const avgTokenLength = lemmas.reduce((sum, token) => sum + token.length, 0) / lemmas.length
  const processingTime = performance.now() - start
  
  return {
    tokenCount: lemmas.length,
    uniqueTokens,
    avgTokenLength: Math.round(avgTokenLength * 10) / 10,
    processingTime: Math.round(processingTime * 100) / 100
  }
}
