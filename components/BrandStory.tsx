import { LandingPage } from '@/types'

interface BrandStoryProps {
  landingPage: LandingPage
}

export default function BrandStory({ landingPage }: BrandStoryProps) {
  const { metadata } = landingPage

  return (
    <section id="brand-story" className="py-32 bg-white">
      <div className="container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Image Column with Rounded Styling */}
          <div className="animate-slide-up">
            {metadata?.story_image?.imgix_url && (
              <div className="relative group">
                <img
                  src={`${metadata.story_image.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress`}
                  alt="Brand Story"
                  className="story-image hover-lift w-full h-auto shadow-strong rounded-3xl" 
                />
                {/* Decorative Rounded Element */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10 group-hover:scale-110 transition-transform duration-500" style={{ transitionDelay: '100ms' }}></div>
              </div>
            )}
          </div>

          {/* Content Column with Rounded Elements */}
          <div className="space-y-12 animate-fade-in animate-delay-400">
            
            {/* Section Label with Rounded Badge */}
            <div>
              <span className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent text-sm font-medium tracking-wide uppercase rounded-full">
                Our Story
              </span>
            </div>

            {/* Story Title with Rounded Background Accent */}
            {metadata?.story_title && (
              <div className="relative">
                <h2 className="section-title text-primary mb-8">
                  {metadata.story_title}
                </h2>
                {/* Decorative underline with rounded ends */}
                <div className="absolute bottom-2 left-0 w-16 h-1 bg-accent rounded-full"></div>
              </div>
            )}

            {/* Brand Story Content in Rounded Container */}
            {metadata?.brand_story && (
              <div className="bg-gray-50 p-8 rounded-2xl">
                <div 
                  className="prose prose-lg max-w-none text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: metadata.brand_story }}
                />
              </div>
            )}

            {/* Feature Cards with Rounded Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-soft hover-lift group">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <span className="text-accent text-xl">🌱</span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Sustainable Materials</h3>
                <p className="text-sm text-foreground/70">Ethically sourced, eco-friendly fabrics that respect our planet.</p>
              </div>
              
              <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-soft hover-lift group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary text-xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Timeless Design</h3>
                <p className="text-sm text-foreground/70">Classic styles that transcend trends and last for years.</p>
              </div>
            </div>

            {/* Call to Action with Rounded Button */}
            <div className="pt-8">
              <a
                href="#email-signup"
                className="btn-primary hover-lift focus-ring inline-flex items-center gap-3"
              >
                Join Our Mission
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}