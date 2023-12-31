import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <link rel="icon" href="/favicon.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body className={inter.className}>
        <div style={{display: 'contents'}}>{children}</div>
      </body>
    </html>
  )
}
