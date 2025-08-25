import { LandingPage } from '@/types'
import { Leaf, Recycle, Heart } from 'lucide-react'

interface BrandStoryProps {
  landingPage: LandingPage
}

export default function BrandStory({ landingPage }: BrandStoryProps) {
  const { metadata } = landingPage
  const storyImage = metadata?.story_image?.imgix_url

  if (!metadata?.story_title && !metadata?.brand_story) {
    return null
  }

  return (
    <section className="py-24 bg-white">
      <div className="container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Story Image */}
          {storyImage && (
            <div className="animate-fade-in order-2 lg:order-1">
              <div className="relative">
                <img
                  src={`${storyImage}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={metadata?.story_title || 'Brand Story'}
                  width="600"
                  height="450"
                  className="w-full h-auto shadow-2xl rounded-none"
                />
                
                {/* Floating sustainability icons */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Story Content */}
          <div className="space-y-8 animate-slide-up order-1 lg:order-2">
            {metadata?.story_title && (
              <div>
                <p className="text-caption text-accent mb-4">Our Mission</p>
                <h2 className="section-title">
                  {metadata.story_title}
                </h2>
              </div>
            )}
            
            {metadata?.brand_story && (
              <div 
                className="prose prose-lg max-w-none text-foreground/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: metadata.brand_story }}
              />
            )}

            {/* Values Grid */}
            <div className="grid grid-cols-1 gap-6 pt-8">
              <div className="flex items-start gap-4 p-6 bg-secondary/30 rounded-none">
                <Heart className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-primary mb-2">Ethical Production</h4>
                  <p className="text-sm text-foreground/70 font-light">
                    Every piece is crafted with care for both people and planet.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-accent/10 rounded-none">
                <Leaf className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-primary mb-2">Sustainable Materials</h4>
                  <p className="text-sm text-foreground/70 font-light">
                    Organic, recycled, and innovative eco-friendly fabrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}