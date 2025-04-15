import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shayan HASHEMI',
  description: 'Shayan Hashemi Portfolio',
  generator: 'Shayan.Hashemi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
