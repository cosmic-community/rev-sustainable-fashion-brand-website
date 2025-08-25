import { NextRequest, NextResponse } from 'next/server'
import { createEmailSubscriber, checkEmailExists } from '@/lib/cosmic'
import { InterestOption } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, interests = [] } = body

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email)
    if (emailExists) {
      return NextResponse.json(
        { message: 'This email is already subscribed to our list' },
        { status: 409 }
      )
    }

    // Validate interests (optional)
    const validInterests: InterestOption[] = [
      'New Arrivals',
      'Sales & Discounts',
      'Style Tips', 
      'Behind the Scenes',
      'Exclusive Events'
    ]
    
    const filteredInterests = interests.filter((interest: string) => 
      validInterests.includes(interest as InterestOption)
    ) as InterestOption[]

    // Create new subscriber
    const subscriber = await createEmailSubscriber(email, filteredInterests)

    return NextResponse.json(
      { 
        message: 'Successfully subscribed!',
        subscriber: {
          id: subscriber.id,
          email: subscriber.metadata.email,
          signup_date: subscriber.metadata.signup_date,
          interests: subscriber.metadata.interests
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}