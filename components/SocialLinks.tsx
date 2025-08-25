'use client'

import { Instagram, ArrowUpRight } from 'lucide-react'
import { LandingPage } from '@/types'

interface SocialLinksProps {
  landingPage: LandingPage
}

export default function SocialLinks({ landingPage }: SocialLinksProps) {
  const { metadata } = landingPage
  const socialLinks = metadata?.social_links

  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return null
  }

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container-width section-padding">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-2xl font-light">Follow Our Journey</h3>
          
          <div className="flex justify-center items-center gap-8">
            {socialLinks.instagram && (
              <button
                onClick={() => handleSocialClick(socialLinks.instagram!)}
                className="group flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-white/50 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
            
            {socialLinks.tiktok && (
              <button
                onClick={() => handleSocialClick(socialLinks.tiktok!)}
                className="group flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-white/50 transition-all duration-300"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-sm font-bold">T</span>
                </div>
                <span>TikTok</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
            
            {socialLinks.pinterest && (
              <button
                onClick={() => handleSocialClick(socialLinks.pinterest!)}
                className="group flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-white/50 transition-all duration-300"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-sm font-bold">P</span>
                </div>
                <span>Pinterest</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}