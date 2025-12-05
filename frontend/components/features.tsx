"use client"

import { FileText, Upload, BarChart3, Clock, Shield, Zap } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: FileText,
      title: "Multi-Format Support",
      description: "Analyze plain text, PDF, Word documents, and images with OCR extraction.",
    },
    {
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "Uses Google Gemini 2.0 Flash for intelligent, structured content analysis.",
    },
    {
      icon: BarChart3,
      title: "Confidence Scoring",
      description: "Get detailed confidence metrics with reasoning and verification tips.",
    },
    {
      icon: Upload,
      title: "Easy Integration",
      description: "RESTful API endpoints with clear documentation and code examples.",
    },
    {
      icon: Clock,
      title: "Conversation History",
      description: "SQLite-backed persistence with pagination and analytics support.",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "File validation, size enforcement, and automatic cleanup of uploads.",
    },
  ]

  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Powerful Features</h2>
          <p className="mt-4 text-lg text-foreground/60">
            Everything you need to build misinformation detection into your application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="group animate-fade-in-up rounded-lg border border-border/50 bg-card p-8 hover:border-accent/50 hover:shadow-lg transition-all duration-300 hover:shadow-accent/10 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
