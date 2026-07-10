import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { FloatingParticlesBackground } from '@/components/floating-particles-background'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hamza Naeem — Cybersecurity & AI Security Portfolio',
  description:
    'Hamza Naeem — Cybersecurity Student, Blue Team Enthusiast, and SOC Analyst Aspirant at the University of the Punjab. Hands-on labs, network security projects, and AI security research.',
  keywords: [
    'Hamza Naeem',
    'Cybersecurity',
    'SOC Analyst',
    'Blue Team',
    'AI Security',
    'Network Security',
    'Cybersecurity Portfolio',
    'Pakistan',
    'University of Punjab',
    'SIEM',
    'TryHackMe',
  ],
  authors: [{ name: 'Hamza Naeem', url: 'https://github.com/hamzanaeem1230' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Hamza Naeem — Cybersecurity & AI Security Portfolio',
    description:
      'Hands-on cybersecurity student focused on Blue Team Operations, SOC Analysis, and AI Security.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamza Naeem — Cybersecurity & AI Security',
    description:
      'Hands-on cybersecurity student focused on Blue Team Operations, SOC Analysis, and AI Security.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#05070A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <body className="relative bg-background font-sans antialiased overflow-x-hidden">
  <FloatingParticlesBackground />

  {/* Skip to main content */}
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
  >
    Skip to main content
  </a>

  <main id="main-content" className="relative z-10">
    {children}
  </main>

  {process.env.NODE_ENV === 'production' && <Analytics />}
</body>
    </html>
  )
}
