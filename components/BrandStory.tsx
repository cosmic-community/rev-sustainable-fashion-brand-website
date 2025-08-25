import { LandingPage } from '@/types'

interface BrandStoryProps {
  landingPage: LandingPage
}

export default function BrandStory({ landingPage }: BrandStoryProps) {
  const { metadata } = landingPage

  if (!metadata?.brand_story) {
    return null
  }

  return (
    <section className="py-24 bg-background">
      <div className="container-width section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Content */}
            <div className="space-y-8 animate-slide-up">
              {metadata?.story_title && (
                <div>
                  <p className="text-caption text-accent mb-4">Our Story</p>
                  <h2 className="section-title text-primary">
                    {metadata.story_title}
                  </h2>
                </div>
              )}

              {metadata?.brand_story && (
                <div 
                  className="prose prose-lg max-w-none text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: metadata.brand_story }}
                />
              )}
            </div>

            {/* Image */}
            {metadata?.story_image?.imgix_url && (
              <div className="animate-fade-in animate-delay-400">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={`${metadata.story_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt="Brand story"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}