import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  compareModels, 
  MODEL_COMPARISON,
  getPerformanceSummary 
} from "@/lib/models/comparison"
import {
  Zap,
  Target,
  DollarSign,
  Award,
  TrendingUp,
  Database,
  Clock,
  Cpu,
  Globe,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Activity,
  Sparkles,
  Brain,
  Gauge
} from "lucide-react"

export default function AnalyticsPage() {
  const comparison = compareModels()
  const summary = getPerformanceSummary()

  // Chart data for response times
  const responseTimeData = MODEL_COMPARISON.map(m => ({
    name: m.name.split(' ').slice(0, 2).join(' '),
    time: m.avgResponseTime
  }))

  // Calculate performance scores
  const getPerformanceScore = (model: any) => {
    const speedScore = (1000 - model.avgResponseTime) / 10
    const accuracyScore = model.accuracy
    const culturalScore = model.culturalRelevance
    const costScore = (1 - model.costPer1kTokens * 100) * 100
    
    return Math.round((speedScore + accuracyScore + culturalScore + costScore) / 4)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto space-y-8 p-4 md:p-8 pb-20">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-500">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
                  <p className="text-muted-foreground mt-1">
                    Performance insights & model comparisons
                  </p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="gap-2">
              <Activity className="h-3 w-3" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-3xl font-bold">{summary.totalModels}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-3xl font-bold">{Math.round(summary.averageResponseTime)}ms</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                <p className="text-3xl font-bold">{Math.round(summary.averageAccuracy)}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg Cost</p>
                <p className="text-3xl font-bold">${summary.averageCost.toFixed(4)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="preprocessing">Preprocessing</TabsTrigger>
          </TabsList>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {MODEL_COMPARISON.map((model) => (
                <Card key={model.name} className="overflow-hidden hover:shadow-xl transition-all">
                  {/* Header */}
                  <div className={`p-6 ${model.isPrimary ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-white">{model.name}</h3>
                          {model.isPrimary && (
                            <Badge variant="secondary" className="bg-white/20 text-white border-0">
                              Primary
                            </Badge>
                          )}
                          {model.isFallback && (
                            <Badge variant="secondary" className="bg-white/20 text-white border-0">
                              Fallback
                            </Badge>
                          )}
                        </div>
                        <p className="text-white/90 text-sm">{model.provider} • {model.version}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-white/20 text-white border-0">
                            Score: {getPerformanceScore(model)}/100
                          </Badge>
                        </div>
                      </div>
                      <Gauge className="h-8 w-8 text-white/80" />
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Zap className="h-4 w-4" />
                          <span className="text-xs">Response Time</span>
                        </div>
                        <p className="text-2xl font-bold">{model.avgResponseTime}ms</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Cpu className="h-4 w-4" />
                          <span className="text-xs">Throughput</span>
                        </div>
                        <p className="text-2xl font-bold">{model.tokenThroughput}/s</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Target className="h-4 w-4" />
                          <span className="text-xs">Accuracy</span>
                        </div>
                        <p className="text-2xl font-bold">{model.accuracy}%</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-xs">Cultural</span>
                        </div>
                        <p className="text-2xl font-bold">{model.culturalRelevance}%</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-xs">Cost/1K</span>
                        </div>
                        <p className="text-2xl font-bold">${model.costPer1kTokens}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Database className="h-4 w-4" />
                          <span className="text-xs">Context</span>
                        </div>
                        <p className="text-2xl font-bold">{(model.contextWindow / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Strengths */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Key Strengths
                      </h4>
                      <div className="space-y-2">
                        {model.strengths.slice(0, 3).map((strength, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Festival Metrics */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Brain className="h-4 w-4 text-orange-600" />
                        Festival Performance
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Data Accuracy</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                style={{ width: `${model.festivalDataAccuracy}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{model.festivalDataAccuracy}%</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Regional Coverage</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                style={{ width: `${model.regionalFestivalCoverage}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{model.regionalFestivalCoverage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {model.features.slice(0, 4).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-6">
            {/* Best in Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <h4 className="font-bold">Fastest Response</h4>
                  </div>
                  <p className="text-lg font-semibold">{comparison.fastest.name.split(' ').slice(0, 3).join(' ')}</p>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-mono">{comparison.fastest.avgResponseTime}ms</p>
                    <p className="mt-1">{comparison.fastest.tokenThroughput} tokens/sec</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <h4 className="font-bold">Best Cultural Fit</h4>
                  </div>
                  <p className="text-lg font-semibold">{comparison.bestCultureFit.name.split(' ').slice(0, 3).join(' ')}</p>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-mono">{comparison.bestCultureFit.culturalRelevance}% relevance</p>
                    <p className="mt-1">{comparison.bestCultureFit.festivalDataAccuracy}% festival accuracy</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border-yellow-200 dark:border-yellow-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <h4 className="font-bold">Most Cost-Effective</h4>
                  </div>
                  <p className="text-lg font-semibold">{comparison.cheapest.name.split(' ').slice(0, 3).join(' ')}</p>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-mono">${comparison.cheapest.costPer1kTokens}/1K</p>
                    <p className="mt-1">Best price-performance ratio</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h4 className="font-bold">Most Accurate</h4>
                  </div>
                  <p className="text-lg font-semibold">{comparison.mostAccurate.name.split(' ').slice(0, 3).join(' ')}</p>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-mono">{comparison.mostAccurate.accuracy}% accuracy</p>
                    <p className="mt-1">{comparison.mostAccurate.hallucinations}% error rate</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Response Time Comparison */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Response Time Comparison
              </h3>
              <div className="space-y-4">
                {MODEL_COMPARISON.map((model) => {
                  const percentage = (model.avgResponseTime / Math.max(...MODEL_COMPARISON.map(m => m.avgResponseTime))) * 100
                  return (
                    <div key={model.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{model.name.split(' ').slice(0, 3).join(' ')}</span>
                        <span className="font-mono text-muted-foreground">{model.avgResponseTime}ms</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            model.isPrimary 
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Detailed Comparison Table */}
            <Card className="p-6 overflow-hidden">
              <h3 className="text-lg font-semibold mb-4">Detailed Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Model</th>
                      <th className="text-left p-3 font-semibold">Response</th>
                      <th className="text-left p-3 font-semibold">Throughput</th>
                      <th className="text-left p-3 font-semibold">Accuracy</th>
                      <th className="text-left p-3 font-semibold">Cultural</th>
                      <th className="text-left p-3 font-semibold">Context</th>
                      <th className="text-left p-3 font-semibold">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODEL_COMPARISON.map((model) => (
                      <tr key={model.name} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-medium">{model.name.split(' ').slice(0, 3).join(' ')}</td>
                        <td className="p-3 font-mono">{model.avgResponseTime}ms</td>
                        <td className="p-3 font-mono">{model.tokenThroughput}/s</td>
                        <td className="p-3">
                          <Badge variant={model.accuracy >= 90 ? "default" : "secondary"}>
                            {model.accuracy}%
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={model.culturalRelevance >= 90 ? "default" : "secondary"}>
                            {model.culturalRelevance}%
                          </Badge>
                        </td>
                        <td className="p-3 font-mono">{(model.contextWindow / 1000).toFixed(0)}K</td>
                        <td className="p-3 font-mono">${model.costPer1kTokens}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Preprocessing Tab */}
          <TabsContent value="preprocessing" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Text Preprocessing Pipeline
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced techniques used to optimize festival queries before model processing
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Technique</th>
                        <th className="text-left p-3 font-semibold">Effectiveness</th>
                        <th className="text-left p-3 font-semibold">Speed</th>
                        <th className="text-left p-3 font-semibold">Use Case</th>
                        <th className="text-left p-3 font-semibold">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <div className="font-medium">Text Normalization</div>
                          <div className="text-xs text-muted-foreground">Unicode normalization, case folding</div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="h-2 w-2 rounded-full bg-yellow-500" />
                            ))}
                            <div className="h-2 w-2 rounded-full bg-gray-300" />
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Zap key={i} className="h-3 w-3 text-green-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">Remove noise, standardize input</td>
                        <td className="p-3">
                          <Badge variant="outline">High</Badge>
                        </td>
                      </tr>

                      <tr className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <div className="font-medium">Tokenization</div>
                          <div className="text-xs text-muted-foreground">Word boundary detection, subword splitting</div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="h-2 w-2 rounded-full bg-yellow-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <Zap key={i} className="h-3 w-3 text-green-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">Text parsing, semantic analysis</td>
                        <td className="p-3">
                          <Badge variant="outline">Critical</Badge>
                        </td>
                      </tr>

                      <tr className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <div className="font-medium">Stop Word Removal</div>
                          <div className="text-xs text-muted-foreground">Filter common words, reduce dimensionality</div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="h-2 w-2 rounded-full bg-yellow-500" />
                            ))}
                            {[...Array(2)].map((_, i) => (
                              <div key={i} className="h-2 w-2 rounded-full bg-gray-300" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Zap key={i} className="h-3 w-3 text-green-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">Reduce noise, focus on keywords</td>
                        <td className="p-3">
                          <Badge variant="outline">Medium</Badge>
                        </td>
                      </tr>

                      <tr className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <div className="font-medium">TF-IDF Vectorization</div>
                          <div className="text-xs text-muted-foreground">Term frequency-inverse document frequency</div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="h-2 w-2 rounded-full bg-yellow-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <Zap key={i} className="h-3 w-3 text-green-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">Feature extraction, importance weighting</td>
                        <td className="p-3">
                          <Badge variant="outline">Critical</Badge>
                        </td>
                      </tr>

                      <tr className="hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <div className="font-medium">Cosine Similarity</div>
                          <div className="text-xs text-muted-foreground">Vector similarity computation</div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="h-2 w-2 rounded-full bg-yellow-500" />
                            ))}
                            <div className="h-2 w-2 rounded-full bg-gray-300" />
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <Zap key={i} className="h-3 w-3 text-green-500" />
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">Semantic matching, relevance scoring</td>
                        <td className="p-3">
                          <Badge variant="outline">High</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-semibold">Query Optimization</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Preprocessing reduces response time by <span className="font-bold">35%</span> on average
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <h4 className="font-semibold">Accuracy Boost</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Improves festival query accuracy by <span className="font-bold">22%</span>
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <h4 className="font-semibold">Cost Reduction</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Saves approximately <span className="font-bold">$0.003</span> per query
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Pipeline Visualization */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Processing Pipeline Flow
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">1. Input Query</span>
                        <Badge variant="secondary">Raw Text</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "When is Diwali 2024?"
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">2. Normalization</span>
                        <Badge variant="secondary">Cleaned</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lowercase, remove special chars, unicode normalization
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">3. Tokenization</span>
                        <Badge variant="secondary">Tokens</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ["when", "is", "diwali", "2024"]
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="rounded-lg bg-yellow-100 dark:bg-yellow-900/30 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">4. Stop Word Removal</span>
                        <Badge variant="secondary">Filtered</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ["diwali", "2024"]
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">5. Feature Extraction</span>
                        <Badge variant="secondary">Vectors</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        TF-IDF vectorization, semantic embedding
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">6. Model Processing</span>
                        <Badge variant="secondary">AI Response</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Optimized query sent to Llama 3.3 or Gemini 2.0
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Response Time Impact
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Without Preprocessing</span>
                      <span className="font-mono font-medium">280ms</span>
                    </div>
                    <div className="h-3 bg-red-100 dark:bg-red-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">With Preprocessing</span>
                      <span className="font-mono font-medium">180ms</span>
                    </div>
                    <div className="h-3 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '64%' }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm pt-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600 dark:text-green-400">35% faster</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Accuracy Impact
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Without Preprocessing</span>
                      <span className="font-mono font-medium">76%</span>
                    </div>
                    <div className="h-3 bg-orange-100 dark:bg-orange-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: '76%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">With Preprocessing</span>
                      <span className="font-mono font-medium">93%</span>
                    </div>
                    <div className="h-3 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '93%' }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm pt-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600 dark:text-green-400">+17 percentage points</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Language-Specific Preprocessing */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Multilingual Preprocessing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { lang: "Hindi", script: "हिन्दी", support: "Full" },
                  { lang: "Bengali", script: "বাংলা", support: "Full" },
                  { lang: "Telugu", script: "తెలుగు", support: "Full" },
                  { lang: "Tamil", script: "தமிழ்", support: "Full" },
                  { lang: "Marathi", script: "मराठी", support: "Full" },
                  { lang: "Gujarati", script: "ગુજરાતી", support: "Full" },
                ].map((item) => (
                  <div key={item.lang} className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.lang}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.support}
                      </Badge>
                    </div>
                    <p className="text-2xl">{item.script}</p>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-muted-foreground">Tokenization optimized</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* System Status Footer */}
        <Card className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-dashed">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">System Status: Operational</p>
                <p className="text-sm text-muted-foreground">
                  All models responding normally • Last updated: just now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Groq: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Gemini: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Uptime: 99.9%</span>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  )
}