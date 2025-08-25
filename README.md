# REVÉ - Sustainable Fashion Brand Website

![App Preview](https://imgix.cosmicjs.com/0c7f2e70-81e9-11f0-b0ac-f12686cb9ade-photo-1441986300917-64674bd600d8-1756149838381.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, sophisticated landing page for REVÉ clothing brand that beautifully showcases sustainable fashion while capturing email subscribers for the upcoming launch. Built with Next.js 15, TypeScript, and Tailwind CSS, this website delivers a premium user experience with seamless content management through Cosmic CMS.

## ✨ Features

- **Stunning Hero Section** - Dynamic hero with customizable backgrounds and compelling headlines
- **Brand Storytelling** - Rich content areas with images and HTML-formatted brand stories
- **Email Capture System** - Functional subscription form with validation and success messaging
- **Launch Countdown** - Optional countdown timer for brand launch dates
- **Social Media Integration** - Connected social profiles with custom links
- **Responsive Design** - Mobile-first design that looks great on all devices
- **SEO Optimized** - Complete meta tags and search engine optimization
- **Admin Dashboard** - Easy content management through Cosmic CMS

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68acb76c04ea77b1e31e55a6&clone_repository=68acb99404ea77b1e31e55bb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to build a modern landing page for my clothing brand inspired by the attached images. I want their to be email capture so that visitors can subscribe to be notified of when we launch"

### Code Generation Prompt

> Build a modern clothing brand website inspired by the attached designs. Inlude the ability for users to enter their email to be notified when we launch. Save those emails to the cosmic CMS.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **React Hook Form** - Form handling and validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd reve-clothing-brand
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📚 Cosmic SDK Examples

### Fetching Landing Page Content
```typescript
import { cosmic } from '@/lib/cosmic'

export async function getLandingPageContent() {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'landing-page' })
      .depth(1)
    return response.object as LandingPage
  } catch (error) {
    console.error('Error fetching landing page:', error)
    return null
  }
}
```

### Creating Email Subscribers
```typescript
export async function createEmailSubscriber(
  email: string,
  interests: string[] = []
) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'email-subscribers',
      title: email,
      metadata: {
        email,
        signup_date: new Date().toISOString().split('T')[0],
        source: {
          key: 'landing_page',
          value: 'Landing Page'
        },
        interests,
        status: {
          key: 'active', 
          value: 'Active'
        },
        notes: ""
      }
    })
    return response.object
  } catch (error) {
    console.error('Error creating subscriber:', error)
    throw error
  }
}
```

## 🎨 Cosmic CMS Integration

The website integrates with two main Cosmic object types:

### Landing Page (Singleton)
- Hero content with customizable titles and backgrounds
- Brand story with rich text content
- Email signup configuration
- Social media links
- SEO meta data

### Email Subscribers
- Captures email addresses with validation
- Tracks signup source and date
- Stores subscriber interests and status
- Admin notes for subscriber management

All content can be updated through the Cosmic dashboard without code changes.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify  
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify settings

### Other Platforms
The app can be deployed to any platform that supports Next.js applications.

<!-- README_END -->