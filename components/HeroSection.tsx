'use client'

import { LandingPage } from '@/types'

interface HeroSectionProps {
  landingPage: LandingPage
}

export default function HeroSection({ landingPage }: HeroSectionProps) {
  const { metadata } = landingPage

  const handleScrollToSignup = () => {
    const signupSection = document.getElementById('email-signup')
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {metadata?.hero_background?.imgix_url && (
        <div className="absolute inset-0 z-0">
          <img
            src={`${metadata.hero_background.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container-width section-padding text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* Brand Logo */}
          {metadata?.brand_logo?.imgix_url && (
            <div className="animate-slide-up">
              <img
                src={`${metadata.brand_logo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={metadata.brand_name || 'Brand logo'}
                className="w-20 h-20 mx-auto mb-8 object-cover"
              />
            </div>
          )}

          {/* Hero Title */}
          {metadata?.hero_title && (
            <div 
              className="animate-slide-up animate-delay-200"
              dangerouslySetInnerHTML={{ __html: metadata.hero_title }}
            />
          )}

          {/* Hero Subtitle */}
          {metadata?.hero_subtitle && (
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slide-up animate-delay-400">
              {metadata.hero_subtitle}
            </p>
          )}

          {/* CTA Button */}
          <div className="animate-slide-up animate-delay-600">
            <button
              onClick={handleScrollToSignup}
              className="btn-primary hover:bg-accent-dark transition-colors duration-300"
            >
              {metadata?.submit_button_text || 'Join the Launch'}
            </button>
          </div>

          {/* Launch Date */}
          {metadata?.launch_date && (
            <p className="text-sm text-white/70 animate-fade-in animate-delay-800">
              Launching {new Date(metadata.launch_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}