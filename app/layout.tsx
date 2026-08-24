import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Davitech AI Cinema',
  description:
    'Mobile-first AI filmmaking workstation for scene-based cinematic production.',
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
