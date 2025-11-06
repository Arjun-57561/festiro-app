// lib/preprocessing/similarity.ts

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(
  vectorA: Record<string, number>,
  vectorB: Record<string, number>
): number {
  let dotProduct = 0
  let magnitudeA = 0
  let magnitudeB = 0
  
  // Get all unique keys
  const allKeys = new Set([...Object.keys(vectorA), ...Object.keys(vectorB)])
  
  allKeys.forEach(key => {
    const a = vectorA[key] || 0
    const b = vectorB[key] || 0
    
    dotProduct += a * b
    magnitudeA += a * a
    magnitudeB += b * b
  })
  
  magnitudeA = Math.sqrt(magnitudeA)
  magnitudeB = Math.sqrt(magnitudeB)
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0
  
  return dotProduct / (magnitudeA * magnitudeB)
}

export interface SimilarityMetrics {
  score: number
  percentageSimilar: number
  interpretation: string
}

export function getSimilarityMetrics(similarity: number): SimilarityMetrics {
  let interpretation = "Different"
  if (similarity > 0.7) interpretation = "Highly Similar"
  else if (similarity > 0.5) interpretation = "Moderately Similar"
  else if (similarity > 0.3) interpretation = "Somewhat Similar"
  
  return {
    score: Math.round(similarity * 1000) / 1000,
    percentageSimilar: Math.round(similarity * 100),
    interpretation
  }
}
