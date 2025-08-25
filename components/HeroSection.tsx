import { LandingPage } from '@/types'

interface HeroSectionProps {
  landingPage: LandingPage
}

export default function HeroSection({ landingPage }: HeroSectionProps) {
  const { metadata } = landingPage

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Rounded Overlay */}
      <div className="absolute inset-0">
        {metadata?.hero_background?.imgix_url && (
          <img
            src={`${metadata.hero_background.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        )}
        {/* Gradient Overlay with Rounded Inner Content */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/40"></div>
      </div>

      {/* Content with Rounded Container */}
      <div className="relative z-10 container-width section-padding">
        <div className="max-w-5xl mx-auto text-center text-white">
          
          {/* Brand Logo with Rounded Edges */}
          {metadata?.brand_logo?.imgix_url && (
            <div className="mb-12 animate-fade-in">
              <img
                src={`${metadata.brand_logo.imgix_url}?w=200&h=200&fit=max&auto=format,compress`}
                alt={metadata?.brand_name || 'Brand Logo'}
                className="h-20 w-auto mx-auto object-contain rounded-xl shadow-soft" 
              />
            </div>
          )}

          {/* Hero Title with Rounded Background Elements */}
          {metadata?.hero_title && (
            <div className="mb-8 animate-slide-up animate-delay-200">
              <div 
                className="prose prose-lg lg:prose-xl max-w-none text-white"
                dangerouslySetInnerHTML={{ __html: metadata.hero_title }}
              />
            </div>
          )}

          {/* Hero Subtitle in Rounded Container */}
          {metadata?.hero_subtitle && (
            <div className="mb-16 animate-fade-in animate-delay-400">
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
                {metadata.hero_subtitle}
              </p>
            </div>
          )}

          {/* CTA Buttons with Enhanced Rounded Styling */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in animate-delay-600">
            <a
              href="#email-signup"
              className="btn-primary hover-lift focus-ring"
            >
              Join Early Access
            </a>
            <a
              href="#brand-story"
              className="btn-secondary hover-lift focus-ring bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary"
            >
              Learn Our Story
            </a>
          </div>

          {/* Launch Date with Rounded Badge */}
          {metadata?.launch_date && (
            <div className="mt-16 animate-fade-in animate-delay-600">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-white/80 text-sm">Launching</span>
                <span className="text-white font-medium">
                  {new Date(metadata.launch_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements with Rounded Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  )
}