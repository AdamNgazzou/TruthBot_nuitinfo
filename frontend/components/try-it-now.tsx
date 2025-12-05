"use client"

import React, { useState } from "react"

// Use environment variable to point to backend (falls back to localhost)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"

import InputSection from "./input-section"
import ResultsDisplay from "./results-display"

interface AnalysisResult {
  label: "reliable" | "doubtful" | "needs_verification" | "potentially_false" | "unknown"
  confidence: number
  content_preview: string
  reasons: string[]
  tips: string[]
  analysis_details?: string
}

export default function TryItNow() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (content: string, type: "text" | "file") => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      let analysisResult: AnalysisResult

      if (type === "text") {
        const response = await fetch(`${API_BASE}/api/analyze/text`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        })

        if (!response.ok) {
          throw new Error("Failed to analyze text")
        }

        analysisResult = await response.json()
      } else {
        const formData = new FormData()
        formData.append("file", content as any)

        const response = await fetch(`${API_BASE}/api/analyze/upload`, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to analyze file")
        }

        analysisResult = await response.json()
      }

      setResult(analysisResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pixel-subtle-texture flex flex-col">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/95 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="animate-pixel-entry">
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">TRUTHBOT</h1>
              <span className="text-xs font-mono text-muted-foreground opacity-60">v1.0</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1.5 font-light">Verify content reliability with precision</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="space-y-8">
          {/* Input section */}
          <div className="animate-pixel-entry" style={{ animationDelay: "0.05s" }}>
            <InputSection isLoading={isLoading} onAnalyze={handleAnalyze} />
          </div>

          {/* Results or empty state */}
          {result && (
            <div className="animate-pixel-entry" style={{ animationDelay: "0.1s" }}>
              <ResultsDisplay result={result} />
            </div>
          )}

          {error && (
            <div className="animate-slide-pixel bg-destructive/8 border border-destructive/30 rounded-sm p-4 text-sm text-destructive/90 space-y-1">
              <p className="font-medium">Analysis failed</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          )}

          {!result && !error && !isLoading && (
            <div className="text-center py-16 text-muted-foreground">
              <div className="inline-block mb-3 text-4xl opacity-40">□</div>
              <p className="text-sm font-light">Enter text or upload a file to begin verification</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border/50 bg-background/50">
        <div className="max-w-3xl mx-auto px-6 py-5 text-center text-xs text-muted-foreground/70 font-light">
          <p>Powered by TruthBot AI Verification Engine</p>
        </div>
      </footer>
    </div>
  )
}
