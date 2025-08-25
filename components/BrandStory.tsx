import { LandingPage } from '@/types'

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
    <section className="py-20 bg-secondary">
      <div className="container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="space-y-8 animate-fade-in">
            {metadata?.story_title && (
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {metadata.story_title}
              </h2>
            )}
            
            {metadata?.brand_story && (
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: metadata.brand_story }}
              />
            )}
          </div>

          {/* Story Image */}
          {storyImage && (
            <div className="animate-fade-in animate-delay-200">
              <img
                src={`${storyImage}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={metadata?.story_title || 'Brand Story'}
                width="600"
                height="450"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}