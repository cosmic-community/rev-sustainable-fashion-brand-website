// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Landing Page singleton interface
export interface LandingPage extends CosmicObject {
  type: 'landing-page';
  metadata: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_background?: {
      url: string;
      imgix_url: string;
    };
    brand_name?: string;
    brand_logo?: {
      url: string;
      imgix_url: string;
    };
    story_title?: string;
    brand_story?: string;
    story_image?: {
      url: string;
      imgix_url: string;
    };
    signup_title?: string;
    signup_description?: string;
    email_placeholder?: string;
    submit_button_text?: string;
    success_message?: string;
    launch_date?: string;
    social_links?: {
      instagram?: string;
      tiktok?: string;
      pinterest?: string;
      [key: string]: string | undefined;
    };
    seo_title?: string;
    seo_description?: string;
  };
}

// Email Subscriber interface
export interface EmailSubscriber extends CosmicObject {
  type: 'email-subscribers';
  metadata: {
    email: string;
    signup_date: string;
    source?: {
      key: string;
      value: string;
    };
    interests?: string[];
    status: {
      key: string;
      value: string;
    };
    notes?: string;
  };
}

// Form interfaces
export interface EmailSignupForm {
  email: string;
  interests?: string[];
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Select dropdown value types
export type SubscriberSource = 'landing_page' | 'social_media' | 'referral' | 'other';
export type SubscriberStatus = 'active' | 'unsubscribed' | 'bounced';
export type InterestOption = 'New Arrivals' | 'Sales & Discounts' | 'Style Tips' | 'Behind the Scenes' | 'Exclusive Events';

// Utility types
export type CreateSubscriberData = Omit<EmailSubscriber, 'id' | 'created_at' | 'modified_at' | 'slug'>;