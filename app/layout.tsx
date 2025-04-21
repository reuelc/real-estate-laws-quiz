import type React from "react"
import { Inter } from "next/font/google"
import ThemeProvider from "@/components/ThemeProvider"
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Real Estate Laws Quiz",
  description: "Test your knowledge of Philippine real estate laws and regulations",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}