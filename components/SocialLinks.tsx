import { LandingPage } from '@/types'
import { Instagram, Music, Pin, ExternalLink } from 'lucide-react'

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
        return <ExternalLink className="w-6 h-6" />
    }
  }

  const getSocialName = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  const getSocialDescription = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'Behind the scenes content'
      case 'tiktok':
        return 'Style inspiration videos'
      case 'pinterest':
        return 'Sustainable fashion boards'
      default:
        return 'Follow our updates'
    }
  }

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-width section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-caption text-primary-foreground/70 mb-4">Stay Connected</p>
            <h3 className="section-title text-primary-foreground">Follow Our Journey</h3>
            <p className="text-body text-primary-foreground/80 max-w-2xl mx-auto mt-6">
              Join our community across social platforms for exclusive content, 
              style inspiration, and the latest sustainability insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(socialLinks).map(([platform, url], index) => {
              if (!url) return null
              
              return (
                <div 
                  key={platform} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group rounded-none"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                        {getSocialIcon(platform)}
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-light text-primary-foreground mb-2">
                          {getSocialName(platform)}
                        </h4>
                        <p className="text-sm text-primary-foreground/70 font-light">
                          {getSocialDescription(platform)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Follow us</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}