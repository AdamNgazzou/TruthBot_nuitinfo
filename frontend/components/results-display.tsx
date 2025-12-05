"use client"

interface AnalysisResult {
  label: "reliable" | "doubtful" | "needs_verification" | "potentially_false" | "unknown"
  confidence: number
  content_preview: string
  reasons: string[]
  tips: string[]
  analysis_details?: string
}

interface ResultsDisplayProps {
  result: AnalysisResult
}

const labelConfig = {
  reliable: {
    icon: "✓",
    color: "text-accent bg-accent/8 border-accent/30",
    title: "Likely Reliable",
    description: "Content appears factually accurate based on available sources.",
  },
  doubtful: {
    icon: "?",
    color:
      "text-amber-600 bg-amber-50/50 border-amber-200/50 dark:text-amber-400 dark:bg-amber-950/20 dark:border-amber-900/30",
    title: "Doubtful",
    description: "Mixed indicators detected. Verification recommended.",
  },
  needs_verification: {
    icon: "!",
    color:
      "text-amber-600 bg-amber-50/50 border-amber-200/50 dark:text-amber-400 dark:bg-amber-950/20 dark:border-amber-900/30",
    title: "Needs Verification",
    description: "Cannot be verified with available sources. Additional research needed.",
  },
  potentially_false: {
    icon: "✕",
    color: "text-destructive bg-destructive/8 border-destructive/30",
    title: "Potentially False",
    description: "Content likely contains misinformation.",
  },
  unknown: {
    icon: "–",
    color: "text-muted-foreground bg-muted/30 border-muted/50",
    title: "Unknown",
    description: "Unable to determine reliability.",
  },
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const config = labelConfig[result.label]
  const confidencePercent = Math.round(result.confidence * 100)

  return (
    <div className="space-y-6">
      <div className={`border rounded-sm p-6 ${config.color} animate-pixel-entry hover-bg-lift hover-shimmer`}>
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0 animate-verification-pop">{config.icon}</div>
          <div className="flex-1">
            <h2 className="text-lg font-bold tracking-wide">{config.title}</h2>
            <p className="text-sm mt-2 opacity-85 font-light">{config.description}</p>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-current border-opacity-20">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wide opacity-75">Confidence</span>
            <span className="text-sm font-bold">{confidencePercent}%</span>
          </div>
          <div className="w-full h-2 bg-current bg-opacity-10 rounded-sm overflow-hidden">
            <div
              className="h-full bg-current rounded-sm animate-pixel-pulse"
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
        </div>
      </div>

      <div
        className="bg-card border border-border/50 rounded-sm p-4 animate-pixel-entry hover-bg-lift transition-all duration-300"
        style={{ animationDelay: "0.08s" }}
      >
        <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">Preview</p>
        <p className="text-sm leading-relaxed text-foreground/75 font-light line-clamp-3">{result.content_preview}</p>
      </div>

      {result.reasons.length > 0 && (
        <div className="animate-pixel-entry space-y-3" style={{ animationDelay: "0.11s" }}>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Findings</h3>
          <ul className="space-y-2">
            {result.reasons.map((reason, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm items-start p-3 rounded-sm transition-all duration-300 border border-transparent hover:border-border/50 hover:bg-muted/20 hover-expanding-glow"
              >
                <span className="text-primary font-bold flex-shrink-0 mt-1">→</span>
                <span className="text-foreground/80 font-light">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.tips.length > 0 && (
        <div className="animate-pixel-entry space-y-3" style={{ animationDelay: "0.14s" }}>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Tips</h3>
          <ul className="space-y-2">
            {result.tips.map((tip, index) => (
              <li
                key={index}
                className="flex gap-3 text-sm items-start bg-muted/25 border border-border/40 rounded-sm p-3 transition-all duration-300 hover:border-primary/30 hover:bg-muted/40 hover-bg-lift hover-shimmer cursor-pointer"
              >
                <span className="text-accent font-bold flex-shrink-0 mt-0.5">★</span>
                <span className="text-foreground/75 font-light">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.analysis_details && (
        <details className="animate-pixel-entry group" style={{ animationDelay: "0.17s" }}>
          <summary className="cursor-pointer text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wide transition-colors py-2 hover-expanding-glow rounded-sm px-2 -mx-2">
            ▸ View Full Analysis
          </summary>
          <div className="mt-3 p-4 bg-muted/15 border border-border/40 rounded-sm text-xs text-foreground/70 leading-relaxed font-light hover-bg-lift transition-all duration-300">
            {result.analysis_details}
          </div>
        </details>
      )}
    </div>
  )
}
