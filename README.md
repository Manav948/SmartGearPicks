# SmartGearPicks

A modern affiliate e-commerce platform built for influencers and content creators to showcase and recommend products. Users can browse curated products and seamlessly redirect to Amazon through affiliate links. The platform includes a secure admin dashboard for managing products, categories, and recommendations.

## Features

### User Features

* Browse curated products
* Search products
* Filter by categories
* Filter by tags
* View product details
* Discover featured products
* Explore trending products
* View creator recommendations
* Mobile-friendly responsive design
* Dark mode support
* Direct Amazon affiliate redirection

### Admin Features

* Secure admin authentication
* Dashboard analytics
* Product management
* Add new products
* Edit existing products
* Delete products
* Category management
* Tag management
* Featured product management
* Product click tracking
* Performance monitoring

## Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Next.js Server Actions
* Next.js API Routes

### Database

* MongoDB Atlas
* Prisma ORM

### Authentication

* NextAuth.js / Auth.js
* JWT Sessions
* Protected Routes

### Storage

* Cloudinary

### Deployment

* Vercel

## Project Structure

```bash
src
├── app
│   ├── page.tsx
│   ├── products
│   │   ├── page.tsx
│   │   └── [slug]
│   │       └── page.tsx
│   │
│   ├── admin
│   │   ├── login
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   │
│   │   └── products
│   │       ├── page.tsx
│   │       ├── new
│   │       └── edit
│   │
│   └── api
│
├── components
├── lib
├── actions
├── hooks
├── types
└── generated
```

## Database Schema

### Admin

```typescript
{
  id: string
  email: string
  password: string
}
```

### Product

```typescript
{
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  affiliateLink: string
  featured: boolean
  category: Category
  tags: Tag[]
  createdAt: Date
  updatedAt: Date
}
```

## Categories

* Electronics
* Fashion
* Beauty & Personal Care
* Health & Fitness
* Books & Education
* Home & Kitchen
* Gaming
* Sports & Outdoors
* Toys & Kids
* Automotive
* Office & Productivity
* Pet Supplies
* Food & Beverages
* Gift Categories
* Travel
* Creator Essentials

## Tags

* Trending
* Best Seller
* Hot Deal
* Recommended
* Editor's Pick
* New Arrival
* Limited Time
* Premium
* Budget Friendly
* Top Rated
* Most Popular
* Featured
* Amazon Choice
* Gift Idea
* Creator Favorite
* Student Pick
* Work From Home
* Travel Friendly
* Gaming Essential
* Smart Home

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd pickora
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="your_mongodb_connection_string"

AUTH_SECRET="your_secret"

AUTH_URL="http://localhost:3000"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Push Schema

```bash
npx prisma db push
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Admin Access

Admin authentication is not publicly visible.

Login route:

```text
/admin/login
```

After successful login:

```text
/admin/dashboard
```

Only authorized administrators can access protected admin routes.

## Future Improvements

* Product analytics dashboard
* Product click heatmaps
* Multiple admin roles
* Scheduled product publishing
* Advanced search
* Product comparison
* Newsletter integration
* Social media integrations
* AI-powered product recommendations
* Affiliate performance reports

## Goals

Pickora aims to provide influencers and content creators with a simple yet powerful platform to curate, organize, and share product recommendations while maximizing affiliate revenue through a premium browsing experience.

## License

MIT License

Copyright (c) 2026 Pickora
