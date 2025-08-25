import { LandingPage } from '@/types'

interface SocialLinksProps {
  landingPage: LandingPage
}

export default function SocialLinks({ landingPage }: SocialLinksProps) {
  const { metadata } = landingPage
  const socialLinks = metadata?.social_links

  if (!socialLinks) return null

  const socialPlatforms = [
    {
      name: 'Instagram',
      url: socialLinks.instagram,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.99-5.366 11.99-11.99C24.007 5.367 18.641.001 12.017.001zm5.457 12.492c0 .702-.047 1.407-.47 2.068-.423.66-1.098 1.145-1.804 1.382-.706.237-1.476.284-2.24.284h-2.92c-.764 0-1.534-.047-2.24-.284-.706-.237-1.381-.722-1.804-1.382-.423-.661-.47-1.366-.47-2.068v-1.01c0-.702.047-1.407.47-2.068.423-.66 1.098-1.145 1.804-1.382.706-.237 1.476-.284 2.24-.284h2.92c.764 0 1.534.047 2.24.284.706.237 1.381.722 1.804 1.382.423.661.47 1.366.47 2.068v1.01zm-1.748-.595c0-.46-.037-.92-.378-1.313-.341-.393-.821-.668-1.329-.791-.508-.123-1.041-.147-1.571-.147h-2.094c-.53 0-1.063.024-1.571.147-.508.123-.988.398-1.329.791-.341.393-.378.853-.378 1.313v.191c0 .46.037.92.378 1.313.341.393.821.668 1.329.791.508.123 1.041.147 1.571.147h2.094c.53 0 1.063-.024 1.571-.147.508-.123.988-.398 1.329-.791.341-.393.378-.853.378-1.313v-.191z"/>
        </svg>
      ),
      color: 'bg-gradient-to-br from-purple-600 to-pink-500'
    },
    {
      name: 'TikTok',
      url: socialLinks.tiktok,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.967-1.166-2.18-1.166-3.338h-3.631v13.959c0 .695-.31 1.323-.797 1.747a2.98 2.98 0 01-3.631-.797 2.98 2.98 0 01-.797-1.747c0-1.654 1.343-2.996 2.996-2.996.695 0 1.323.31 1.747.797v-3.631c-3.309 0-5.992 2.683-5.992 5.992 0 1.654.672 3.15 1.747 4.225s2.571 1.747 4.225 1.747c3.309 0 5.992-2.683 5.992-5.992V9.553a9.644 9.644 0 005.562 1.747V7.669c-1.654 0-3.15-.672-4.225-1.747z"/>
        </svg>
      ),
      color: 'bg-black'
    },
    {
      name: 'Pinterest',
      url: socialLinks.pinterest,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.120.110.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.366 11.99-11.99C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
      color: 'bg-red-600'
    }
  ]

  const activePlatforms = socialPlatforms.filter(platform => platform.url && platform.url.trim() !== '')

  if (activePlatforms.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-width section-padding">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Section Header with Rounded Elements */}
          <div className="mb-16 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/40 mb-6">
              <span className="text-primary text-sm font-medium tracking-wide uppercase">Follow Our Journey</span>
            </div>
            <h2 className="section-title text-primary mb-6">
              Connect with {metadata?.brand_name || 'Future Fashion'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Stay updated on our sustainable fashion journey and get behind-the-scenes 
              content on your favorite social platforms.
            </p>
          </div>

          {/* Social Links with Enhanced Rounded Design */}
          <div className="flex flex-wrap gap-8 justify-center animate-slide-up animate-delay-400">
            {activePlatforms.map((platform, index) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group flex items-center gap-4 px-8 py-6 text-white font-medium 
                  transition-all duration-300 hover:scale-110 hover:shadow-2xl
                  ${platform.color} rounded-2xl shadow-medium hover-lift focus-ring
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {platform.icon}
                </div>
                <span className="font-semibold tracking-wide">
                  {platform.name}
                </span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ))}
          </div>

          {/* Brand Statement with Rounded Container */}
          <div className="mt-20 p-8 bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl shadow-medium animate-fade-in animate-delay-600">
            <blockquote className="text-xl italic text-primary font-light leading-relaxed">
              "Fashion fades, but sustainable style is eternal. Join us in creating a wardrobe that cares."
            </blockquote>
            {metadata?.brand_name && (
              <cite className="block mt-4 text-accent font-medium not-italic">
                — The {metadata.brand_name} Team
              </cite>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}