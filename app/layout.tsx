import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Levi Setiadi | Creative Developer & Designer",
  description:
    "Portfolio of Levi Setiadi - Creative Developer specializing in AI-powered applications and modern web solutions",
  generator: "v0.app",
  keywords: ["developer", "portfolio", "AI", "web development", "creative"],
  authors: [{ name: "Levi Setiadi" }],
  openGraph: {
    title: "Levi Setiadi | Creative Developer & Designer",
    description: "Portfolio showcasing innovative projects and AI-powered solutions",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
