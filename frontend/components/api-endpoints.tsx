"use client"

import { Code2, Upload, History, BarChart3, Trash2 } from "lucide-react"

export default function APIEndpoints() {
  const endpoints = [
    {
      icon: Code2,
      method: "POST",
      path: "/api/analyze/text",
      description: "Analyze text content for misinformation",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      icon: Upload,
      method: "POST",
      path: "/api/analyze/upload",
      description: "Upload and analyze PDF, DOCX, or images",
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      icon: History,
      method: "GET",
      path: "/api/conversations",
      description: "Retrieve conversation history with pagination",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      icon: BarChart3,
      method: "GET",
      path: "/api/conversations/stats/summary",
      description: "Get analytics and statistics",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      icon: Trash2,
      method: "DELETE",
      path: "/api/conversations/{id}",
      description: "Delete a specific conversation",
      color: "bg-red-500/10 text-red-600 dark:text-red-400",
    },
  ]

  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">API Endpoints</h2>
          <p className="mt-4 text-lg text-foreground/60">Comprehensive REST endpoints for all your needs</p>
        </div>

        <div className="space-y-4">
          {endpoints.map((endpoint, idx) => {
            const Icon = endpoint.icon
            return (
              <div
                key={idx}
                className="animate-fade-in-up group rounded-lg border border-border/50 bg-card p-6 hover:border-accent/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${endpoint.color} flex-shrink-0`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="inline-block px-2 py-1 rounded text-xs font-bold text-white bg-primary">
                          {endpoint.method}
                        </span>
                        <code className="font-mono text-sm text-foreground font-semibold">{endpoint.path}</code>
                      </div>
                      <p className="text-sm text-foreground/60">{endpoint.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
