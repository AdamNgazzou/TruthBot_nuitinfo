"use client"

import { Database, Cpu, Network, Cog } from "lucide-react"

export default function Architecture() {
  const components = [
    {
      icon: Network,
      title: "FastAPI Routes",
      items: ["/api/analyze", "/api/conversations"],
    },
    {
      icon: Cpu,
      title: "Core Services",
      items: ["GeminiService", "ExtractorService", "SearchService", "AnalyzerService"],
    },
    {
      icon: Cog,
      title: "Utilities",
      items: ["FileHandler", "Configuration", "Error Handling"],
    },
    {
      icon: Database,
      title: "Data Layer",
      items: ["SQLite Database", "Conversation History"],
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-secondary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Architecture</h2>
          <p className="mt-4 text-lg text-foreground/60">Modular design built for scalability and maintainability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {components.map((component, idx) => {
            const Icon = component.icon
            return (
              <div
                key={idx}
                className="animate-fade-in-up rounded-lg border border-border/50 bg-card p-8 hover:border-primary/50 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-4">{component.title}</h3>
                <ul className="space-y-2">
                  {component.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm text-foreground/60 flex items-start gap-2">
                      <span className="text-accent mt-1">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
