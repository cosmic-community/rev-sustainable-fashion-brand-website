import { LandingPage } from '@/types'
import { Instagram, Music, Pin } from 'lucide-react'

interface SocialLinksProps {
  landingPage: LandingPage
}

export default function SocialLinks({ landingPage }: SocialLinksProps) {
  const { metadata } = landingPage
  const socialLinks = metadata?.social_links

  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return null
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-6 h-6" />
      case 'tiktok':
        return <Music className="w-6 h-6" />
      case 'pinterest':
        return <Pin className="w-6 h-6" />
      default:
        return null
    }
  }

  const getSocialName = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container-width section-padding">
        <div className="text-center animate-fade-in">
          <h3 className="text-2xl font-bold mb-8">Follow Our Journey</h3>
          <div className="flex justify-center gap-8">
            {Object.entries(socialLinks).map(([platform, url]) => {
              if (!url) return null
              
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity duration-200 group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-primary-foreground flex items-center justify-center group-hover:bg-primary-foreground group-hover:text-primary transition-all duration-200">
                    {getSocialIcon(platform)}
                  </div>
                  <span className="text-sm">{getSocialName(platform)}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}