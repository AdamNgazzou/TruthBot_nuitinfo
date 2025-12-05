"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

interface InputSectionProps {
  isLoading: boolean
  onAnalyze: (content: string, type: "text" | "file") => void
}

export default function InputSection({ isLoading, onAnalyze }: InputSectionProps) {
  const [textInput, setTextInput] = useState("")
  const [activeTab, setActiveTab] = useState<"text" | "file">("text")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextAnalyze = () => {
    if (textInput.trim()) {
      onAnalyze(textInput, "text")
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onAnalyze(file, "file")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add("border-primary/40", "bg-primary/3")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("border-primary/40", "bg-primary/3")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("border-primary/40", "bg-primary/3")
    const file = e.dataTransfer.files?.[0]
    if (file) {
      onAnalyze(file, "file")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 border-b border-border/40 px-1">
        <button
          onClick={() => setActiveTab("text")}
          className={`px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 relative hover-expanding-glow ${
            activeTab === "text" ? "text-primary" : "text-muted-foreground hover:text-foreground/60"
          }`}
        >
          Text Input
          {activeTab === "text" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-pixel-entry" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("file")}
          className={`px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 relative hover-expanding-glow ${
            activeTab === "file" ? "text-primary" : "text-muted-foreground hover:text-foreground/60"
          }`}
        >
          File Upload
          {activeTab === "file" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-pixel-entry" />
          )}
        </button>
      </div>

      {activeTab === "text" && (
        <div className="space-y-4 animate-pixel-entry">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste your content here for verification analysis..."
            disabled={isLoading}
            className="w-full h-48 p-4 bg-card border border-border/60 rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 disabled:opacity-50 transition-all placeholder:text-muted-foreground/60 font-light text-sm leading-relaxed hover-gradient-shift"
          />
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleTextAnalyze}
              disabled={!textInput.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground uppercase text-xs font-semibold tracking-wide px-6 py-2 rounded-sm transition-all duration-300 disabled:opacity-60 hover-button-expand"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                "Verify Content"
              )}
            </Button>
          </div>
        </div>
      )}

      {activeTab === "file" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-border/60 rounded-sm p-10 text-center cursor-pointer transition-all duration-300 hover:border-primary/40 hover:bg-primary/3 hover-shimmer"
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            disabled={isLoading}
            accept=".pdf,.docx,.doc,.txt,.jpg,.jpeg,.png,.gif"
            className="hidden"
          />
          <div className="space-y-3">
            <div className="text-3xl font-light opacity-40">▢</div>
            <p className="text-sm font-semibold text-foreground tracking-wide">Drop file or click to upload</p>
            <p className="text-xs text-muted-foreground/70">PDF, DOCX, TXT, JPG, PNG (max 50MB)</p>
          </div>
        </div>
      )}
    </div>
  )
}
