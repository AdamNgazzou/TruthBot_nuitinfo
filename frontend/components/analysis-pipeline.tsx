"use client"

import { ArrowRight } from "lucide-react"

export default function AnalysisPipeline() {
  const textPipeline = ["Input Validation", "Web Search (Optional)", "Gemini Analysis", "Parsing", "Response"]

  const filePipeline = [
    "File Upload",
    "Text Extraction",
    "Content Truncation",
    "Web Search (Optional)",
    "Gemini Analysis",
    "File Cleanup",
    "Response",
  ]

  return (
    <section className="py-20 sm:py-32 bg-secondary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Analysis Pipeline</h2>
          <p className="mt-4 text-lg text-foreground/60">See how your content flows through our system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Text Pipeline */}
          <div className="animate-fade-in-up">
            <h3 className="font-semibold text-lg text-foreground mb-6">Text Analysis Flow</h3>
            <div className="space-y-3">
              {textPipeline.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 px-4 py-3 rounded-lg bg-card border border-border/50 font-medium text-foreground">
                    {step}
                  </div>
                  {idx < textPipeline.length - 1 && (
                    <div className="absolute left-[calc(1.25rem+20px)] translate-y-12">
                      <ArrowRight className="h-5 w-5 text-border rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* File Pipeline */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold text-lg text-foreground mb-6">File Analysis Flow</h3>
            <div className="space-y-3">
              {filePipeline.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 px-4 py-3 rounded-lg bg-card border border-border/50 font-medium text-foreground">
                    {step}
                  </div>
                  {idx < filePipeline.length - 1 && (
                    <div className="absolute left-[calc(1.25rem+20px)] translate-y-12">
                      <ArrowRight className="h-5 w-5 text-border rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
