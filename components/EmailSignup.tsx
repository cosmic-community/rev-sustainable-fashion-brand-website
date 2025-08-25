'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Check, AlertCircle } from 'lucide-react'
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
      <section className="py-20 bg-white">
        <div className="container-width section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              
              {metadata?.success_message ? (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: metadata.success_message }}
                />
              ) : (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                  <p className="text-gray-600">
                    You've been successfully added to our launch notification list.
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
    <section className="py-20 bg-white">
      <div className="container-width section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-fade-in">
            {/* Signup Title */}
            {metadata?.signup_title && (
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                {metadata.signup_title}
              </h2>
            )}

            {/* Signup Description */}
            {metadata?.signup_description && (
              <div 
                className="prose prose-lg max-w-none text-gray-700 mb-10"
                dangerouslySetInnerHTML={{ __html: metadata.signup_description }}
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder={metadata?.email_placeholder || 'Enter your email address'}
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
                  <p className="mt-2 text-sm text-red-600 text-left">{errors.email.message}</p>
                )}
              </div>

              {/* Interests */}
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What interests you? (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={interest}
                        {...register('interests')}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Subscribing...
                  </span>
                ) : (
                  metadata?.submit_button_text || 'Notify Me at Launch'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}