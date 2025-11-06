// lib/preprocessing/text-normalization.ts

/**
 * Normalize festival questions for consistency
 */
export function normalizeText(text: string): string {
  return text
    // Convert to lowercase
    .toLowerCase()
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim()
    // Remove special characters (keep basic punctuation)
    .replace(/[^\w\s?.!'-]/g, '')
    // Fix common typos
    .replace(/diwali/g, 'diwali')
    .replace(/holi/g, 'holi')
    .replace(/navratri/g, 'navratri')
    .replace(/muhurat/g, 'muhurat')
}

export function getMetrics(technique: string, dataset: string[]): {
  avgLength: number
  uniqueWords: number
  preprocessingTime: number
} {
  const start = performance.now()
  
  const normalized = dataset.map(normalizeText)
  const avgLength = normalized.reduce((sum, text) => sum + text.length, 0) / normalized.length
  
  const uniqueWords = new Set(
    normalized.flatMap(text => text.split(' '))
  ).size
  
  const preprocessingTime = performance.now() - start
  
  return {
    avgLength: Math.round(avgLength),
    uniqueWords,
    preprocessingTime: Math.round(preprocessingTime * 100) / 100
  }
}
