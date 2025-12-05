"use client"

import { ArrowRight, CheckCircle } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/10 py-20 sm:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 h-72 w-72 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle" />
        <div
          className="absolute bottom-20 left-20 h-72 w-72 bg-primary/10 rounded-full blur-3xl animate-pulse-subtle"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              <CheckCircle className="h-4 w-4" />
              Powered by Google Gemini AI
            </div>

            <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
              Detect Misinformation
              <span className="block text-primary">with Advanced AI</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70 text-balance">
              TruthBot is an AI-powered backend API that analyzes text and files to assess reliability, detect
              misinformation, and provide confidence-based verification insights.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-3 font-semibold hover:bg-secondary transition-colors">
                View Docs
              </button>
            </div>
          </div>
        </div>

        {/* Feature stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "50MB", label: "Max File Size" },
            { number: "5-15s", label: "Analysis Speed" },
            { number: "5", label: "Reliability Labels" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="animate-fade-in-up rounded-lg border border-border/50 bg-card p-6 text-center backdrop-blur"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-primary">{stat.number}</div>
              <div className="mt-2 text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
