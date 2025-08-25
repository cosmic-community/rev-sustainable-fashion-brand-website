import { LandingPage } from '@/types'

interface HeroSectionProps {
  landingPage: LandingPage
}

export default function HeroSection({ landingPage }: HeroSectionProps) {
  const { metadata } = landingPage
  const heroBackground = metadata?.hero_background?.imgix_url
  const brandLogo = metadata?.brand_logo?.imgix_url

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: heroBackground ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroBackground}?w=1920&h=1080&fit=crop&auto=format,compress)` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container-width section-padding text-center text-white animate-fade-in">
        {/* Brand Logo */}
        {brandLogo && (
          <div className="mb-8 animate-slide-up">
            <img
              src={`${brandLogo}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={metadata?.brand_name || 'Brand Logo'}
              width="120"
              height="120"
              className="mx-auto rounded-full shadow-2xl"
            />
          </div>
        )}

        {/* Brand Name */}
        {metadata?.brand_name && (
          <div className="mb-6 animate-slide-up animate-delay-200">
            <h2 className="text-2xl md:text-3xl font-light tracking-wider uppercase">
              {metadata.brand_name}
            </h2>
          </div>
        )}

        {/* Hero Title */}
        {metadata?.hero_title && (
          <div 
            className="hero-text mb-6 animate-slide-up animate-delay-400"
            dangerouslySetInnerHTML={{ __html: metadata.hero_title }}
          />
        )}

        {/* Hero Subtitle */}
        {metadata?.hero_subtitle && (
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed animate-slide-up animate-delay-400">
            {metadata.hero_subtitle}
          </p>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}