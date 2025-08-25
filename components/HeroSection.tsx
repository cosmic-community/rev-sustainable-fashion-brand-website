import { LandingPage } from '@/types'
import { ArrowDown, Globe, Zap, Users } from 'lucide-react'

interface HeroSectionProps {
  landingPage: LandingPage
}

export default function HeroSection({ landingPage }: HeroSectionProps) {
  const { metadata } = landingPage
  const heroBackground = metadata?.hero_background?.imgix_url
  const brandLogo = metadata?.brand_logo?.imgix_url

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary/20"
      style={{
        backgroundImage: heroBackground ? `linear-gradient(rgba(241,244,245,0.8), rgba(241,244,245,0.8)), url(${heroBackground}?w=1920&h=1080&fit=crop&auto=format,compress)` : 'linear-gradient(135deg, #F1F4F5 0%, #E2EBED 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Column - Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Brand Logo */}
            {brandLogo && (
              <div className="animate-fade-in">
                <img
                  src={`${brandLogo}?w=120&h=120&fit=crop&auto=format,compress`}
                  alt={metadata?.brand_name || 'Brand Logo'}
                  width="80"
                  height="80"
                  className="rounded-none shadow-lg"
                />
              </div>
            )}

            {/* Brand Name */}
            {metadata?.brand_name && (
              <div className="animate-slide-up animate-delay-200">
                <p className="text-caption text-muted-foreground mb-2">
                  Sustainable Fashion Brand
                </p>
                <h1 className="text-display text-primary">
                  {metadata.brand_name}
                </h1>
              </div>
            )}

            {/* Hero Title */}
            {metadata?.hero_title && (
              <div 
                className="text-heading text-foreground animate-slide-up animate-delay-400"
                dangerouslySetInnerHTML={{ __html: metadata.hero_title }}
              />
            )}

            {/* Hero Subtitle */}
            {metadata?.hero_subtitle && (
              <p className="text-subheading text-foreground/70 max-w-2xl animate-slide-up animate-delay-600">
                {metadata.hero_subtitle}
              </p>
            )}

            {/* Feature List */}
            <div className="space-y-4 animate-slide-up animate-delay-600">
              <div className="feature-item">
                <Globe className="feature-icon" />
                <span>Global delivery</span>
              </div>
              <div className="feature-item">
                <Zap className="feature-icon" />
                <span>Style and comfort</span>
              </div>
              <div className="feature-item">
                <Users className="feature-icon" />
                <span>Made for progress</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="animate-slide-up animate-delay-600">
              <button 
                onClick={() => {
                  document.querySelector('#email-signup')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
                className="btn-primary group flex items-center gap-3"
              >
                Discover now
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative animate-fade-in animate-delay-400">
            <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-none shadow-2xl flex items-center justify-center">
              {/* Placeholder for product image or brand visual */}
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full"></div>
                </div>
                <p className="text-caption text-muted-foreground">
                  Coming Soon
                </p>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-center">
            <p className="text-caption text-muted-foreground mb-2">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}