import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getLandingPageContent } from '@/lib/cosmic'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const landingPage = await getLandingPageContent()
  
  const title = landingPage?.metadata?.seo_title || 'REVÉ - Sustainable Fashion Coming Soon'
  const description = landingPage?.metadata?.seo_description || 'Discover REVÉ\'s sustainable clothing collection launching soon. Join our community for early access and premium eco-friendly fashion.'
  
  return {
    title,
    description,
    keywords: 'sustainable fashion, eco-friendly clothing, premium fashion, REVÉ brand, coming soon',
    authors: [{ name: 'REVÉ Fashion' }],
    openGraph: {
      title,
      description,
      type: 'website',
      images: landingPage?.metadata?.hero_background ? [{
        url: `${landingPage.metadata.hero_background.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
        width: 1200,
        height: 630,
        alt: title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: landingPage?.metadata?.hero_background ? [
        `${landingPage.metadata.hero_background.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      ] : [],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}