import { createBucketClient } from '@cosmicjs/sdk'
import { LandingPage, EmailSubscriber, SubscriberSource, SubscriberStatus, InterestOption } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch landing page content
export async function getLandingPageContent(): Promise<LandingPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'landing-page' })
      .depth(1)
    
    return response.object as LandingPage
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching landing page:', error)
    throw new Error('Failed to fetch landing page content')
  }
}

// Create new email subscriber
export async function createEmailSubscriber(
  email: string,
  interests: InterestOption[] = []
): Promise<EmailSubscriber> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'email-subscribers',
      title: email,
      metadata: {
        email,
        signup_date: new Date().toISOString().split('T')[0],
        source: {
          key: 'landing_page' as SubscriberSource,
          value: 'Landing Page'
        },
        interests,
        status: {
          key: 'active' as SubscriberStatus,
          value: 'Active'
        },
        notes: ""
      }
    })
    
    return response.object as EmailSubscriber
  } catch (error) {
    console.error('Error creating email subscriber:', error)
    throw new Error('Failed to subscribe email')
  }
}

// Check if email already exists
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'email-subscribers',
        'metadata.email': email 
      })
      .props(['id'])
    
    return response.objects.length > 0
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return false
    }
    console.error('Error checking email existence:', error)
    return false
  }
}

// Get subscriber count
export async function getSubscriberCount(): Promise<number> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'email-subscribers',
        'metadata.status.key': 'active'
      })
      .props(['id'])
    
    return response.objects.length
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return 0
    }
    console.error('Error getting subscriber count:', error)
    return 0
  }
}