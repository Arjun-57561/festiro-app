// lib/preprocessing/tfidf.ts

/**
 * Calculate Term Frequency - Inverse Document Frequency
 */
export class TFIDFVectorizer {
  private documentFrequency: Map<string, number> = new Map()
  private totalDocuments = 0

  train(documents: string[]): void {
    this.totalDocuments = documents.length
    
    // Calculate document frequency for each term
    documents.forEach(doc => {
      const uniqueTerms = new Set(doc.split(/\s+/))
      uniqueTerms.forEach(term => {
        const current = this.documentFrequency.get(term) || 0
        this.documentFrequency.set(term, current + 1)
      })
    })
  }

  transform(document: string): Record<string, number> {
    const terms = document.split(/\s+/)
    const termFrequency: Record<string, number> = {}
    
    // Calculate term frequency
    terms.forEach(term => {
      termFrequency[term] = (termFrequency[term] || 0) + 1
    })
    
    // Normalize TF
    Object.keys(termFrequency).forEach(term => {
      termFrequency[term] /= terms.length
    })
    
    // Calculate TF-IDF
    const tfidf: Record<string, number> = {}
    Object.keys(termFrequency).forEach(term => {
      const df = this.documentFrequency.get(term) || 1
      const idf = Math.log(this.totalDocuments / df)
      tfidf[term] = termFrequency[term] * idf
    })
    
    return tfidf
  }

  getMetrics(): { uniqueTerms: number; averageIDF: number } {
    const idfs = Array.from(this.documentFrequency.values()).map(df =>
      Math.log(this.totalDocuments / df)
    )
    
    return {
      uniqueTerms: this.documentFrequency.size,
      averageIDF: idfs.reduce((a, b) => a + b, 0) / idfs.length
    }
  }
}
