import { getLandingPageContent } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import BrandStory from '@/components/BrandStory'
import EmailSignup from '@/components/EmailSignup'
import SocialLinks from '@/components/SocialLinks'

export default async function HomePage() {
  const landingPage = await getLandingPageContent()
  
  if (!landingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Available</h1>
          <p className="text-gray-600">Please check your Cosmic CMS configuration.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <HeroSection landingPage={landingPage} />
      <BrandStory landingPage={landingPage} />
      <EmailSignup landingPage={landingPage} />
      <SocialLinks landingPage={landingPage} />
    </main>
  )
}