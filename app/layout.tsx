import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shayan Hashemi · Voxel Portfolio',
  description: 'A voxel-style interactive portfolio — walk around and mine blocks to reveal each section.',
  generator: 'Shayan.HASHEMI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-[#8ecbff] text-white overflow-hidden">{children}</body>
    </html>
  )
}
