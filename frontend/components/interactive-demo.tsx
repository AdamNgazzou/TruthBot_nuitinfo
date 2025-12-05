"use client"

import { useState } from "react"
import { Upload, Send, Loader } from "lucide-react"

export default function InteractiveDemo() {
  const [analysisType, setAnalysisType] = useState("text")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const mockAnalyze = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))

    const mockResults = {
      reliable: {
        label: "Reliable",
        confidence: 0.85,
        reasons: ["Content appears factually accurate", "Consistent with verified sources"],
        tips: ["Cross-reference with official sources", "Check publication date"],
      },
      doubtful: {
        label: "Doubtful",
        confidence: 0.65,
        reasons: ["Some concerns detected", "Mixed indicators present"],
        tips: ["Seek additional sources", "Verify claims independently"],
      },
      needs_verification: {
        label: "Needs Verification",
        confidence: 0.6,
        reasons: ["Cannot be verified immediately", "Requires further research"],
        tips: ["Search for fact-checking sources", "Look for expert commentary"],
      },
    }

    setResult(
      mockResults[Math.random() > 0.33 ? (Math.random() > 0.5 ? "reliable" : "doubtful") : "needs_verification"],
    )
    setLoading(false)
  }

  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Try It Now</h2>
          <p className="mt-4 text-lg text-foreground/60">Test the analysis engine with your own content</p>
        </div>

        <div className="animate-fade-in-up rounded-lg border border-border/50 bg-card p-8 shadow-lg">
          {/* Type Selection */}
          <div className="flex gap-4 mb-8">
            {[
              { id: "text", label: "Text Analysis" },
              { id: "file", label: "File Upload" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setAnalysisType(type.id)
                  setResult(null)
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  analysisType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="mb-6">
            {analysisType === "text" ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste text to analyze here..."
                className="w-full h-32 p-4 rounded-lg border border-border/50 bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            ) : (
              <div className="flex items-center justify-center h-32 rounded-lg border-2 border-dashed border-border/50 bg-background hover:border-accent/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-foreground/60">Click to upload or drag and drop</p>
                  <p className="text-xs text-foreground/40 mt-1">PDF, DOCX, or Image (max 50MB)</p>
                </div>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <button
            onClick={mockAnalyze}
            disabled={loading || (!content && analysisType === "text")}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Analyze Content
              </>
            )}
          </button>

          {/* Results */}
          {result && (
            <div className="mt-8 animate-fade-in-up rounded-lg border border-accent/50 bg-accent/5 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                  <span className="text-2xl">✓</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">{result.label}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 w-48 rounded-full bg-border/50 overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-500"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {result.reasons && (
                  <div>
                    <h4 className="font-semibold text-foreground/80 mb-2">Why:</h4>
                    <ul className="space-y-1">
                      {result.reasons.map((reason: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground/60 flex gap-2">
                          <span className="text-accent">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.tips && (
                  <div>
                    <h4 className="font-semibold text-foreground/80 mb-2">Tips:</h4>
                    <ul className="space-y-1">
                      {result.tips.map((tip: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground/60 flex gap-2">
                          <span className="text-accent">→</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
