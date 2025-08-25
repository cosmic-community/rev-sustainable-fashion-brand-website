'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Check, AlertCircle, ArrowRight } from 'lucide-react'
import { LandingPage, EmailSignupForm, InterestOption } from '@/types'

interface EmailSignupProps {
  landingPage: LandingPage
}

const interestOptions: InterestOption[] = [
  'New Arrivals',
  'Sales & Discounts', 
  'Style Tips',
  'Behind the Scenes',
  'Exclusive Events'
]

export default function EmailSignup({ landingPage }: EmailSignupProps) {
  const { metadata } = landingPage
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EmailSignupForm>()

  const onSubmit = async (data: EmailSignupForm) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          interests: data.interests || []
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Subscription failed')
      }

      setIsSuccess(true)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section id="email-signup" className="py-24 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="container-width section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in space-y-8">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-white" />
              </div>
              
              {metadata?.success_message ? (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: metadata.success_message }}
                />
              ) : (
                <div className="space-y-4">
                  <h3 className="text-heading text-primary">Welcome to the journey</h3>
                  <p className="text-body text-foreground/70 max-w-lg mx-auto">
                    You've been successfully added to our launch notification list. 
                    Get ready for sustainable fashion that makes a difference.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="email-signup" className="py-24 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="container-width section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8 animate-slide-up">
              {metadata?.signup_title && (
                <div>
                  <p className="text-caption text-accent mb-4">Join the Movement</p>
                  <h2 className="section-title text-primary">
                    {metadata.signup_title}
                  </h2>
                </div>
              )}

              {metadata?.signup_description && (
                <div 
                  className="prose prose-lg max-w-none text-foreground/80"
                  dangerouslySetInnerHTML={{ __html: metadata.signup_description }}
                />
              )}

              {/* Stats or Features */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-light text-primary">100%</div>
                  <div className="text-caption text-muted-foreground">Sustainable</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-primary">24h</div>
                  <div className="text-caption text-muted-foreground">Early Access</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-primary">0%</div>
                  <div className="text-caption text-muted-foreground">Spam</div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="animate-fade-in animate-delay-400">
              <div className="bg-white p-8 shadow-2xl rounded-none">
                
                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 flex items-center gap-3 text-red-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Email Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-caption text-muted-foreground mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <input
                        type="email"
                        placeholder={metadata?.email_placeholder || 'your@email.com'}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter a valid email address'
                          }
                        })}
                        className="input-field pl-12"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-caption text-muted-foreground mb-4">
                      What interests you? (Optional)
                    </label>
                    <div className="space-y-3">
                      {interestOptions.map((interest) => (
                        <label key={interest} className="flex items-center space-x-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            value={interest}
                            {...register('interests')}
                            className="w-4 h-4 border-2 border-muted rounded-none text-accent focus:ring-accent"
                            disabled={isSubmitting}
                          />
                          <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                            {interest}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full group flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <>
                        {metadata?.submit_button_text || 'Join the Launch'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}