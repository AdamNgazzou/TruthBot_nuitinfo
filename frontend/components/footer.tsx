"use client"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Changelog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Examples
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-accent transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-accent transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-foreground/60">
              © 2025 TruthBot. Built for Nuit de l&apos;Info 2024 AI4GOOD Challenge.
            </p>
            <p className="text-sm text-foreground/60 mt-4 md:mt-0">Powered by Google Gemini AI</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
