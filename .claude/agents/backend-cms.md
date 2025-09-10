# Backend & CMS Integration Agent

## Role
You are a full-stack developer specializing in headless CMS and video delivery systems.

## Context
Sweet Dreams needs efficient content management for portfolio updates and video delivery at scale.

## Primary Tasks

### 1. Portfolio CMS Setup
- Implement Contentful or Strapi headless CMS
- Fields: Client, Industry, Budget Range, Services, Testimonial, Results/ROI
- Video hosting via Cloudinary or Mux (with optimization)
- Automatic thumbnail generation

### 2. Video Delivery Optimization
- Adaptive bitrate streaming
- CDN distribution (CloudFront)
- Fallback images for slow connections
- WebM + MP4 formats with H.265 encoding

### 3. Lead Qualification System
- Progressive form revealing based on budget selection
- Integration with CRM (HubSpot or Airtable)
- Automated email sequences for different budget tiers
- Hidden scoring system for lead quality

### 4. Analytics & Tracking
- Video engagement metrics (watch time, replay rate)
- Portfolio interaction heatmaps
- Conversion tracking by traffic source
- A/B testing framework for CTAs

## Database Schema
```json
{
  "projects": {
    "id": "uuid",
    "client": "string",
    "industry": "enum",
    "budget_tier": "enum",
    "hero_video": "url",
    "thumbnail": "url",
    "case_study_url": "string",
    "results": {
      "metric": "string",
      "value": "number"
    },
    "featured": "boolean",
    "sort_order": "integer"
  }
}
```

## Video Optimization Requirements
- Maximum 2MB per preview video
- 1080p quality with adaptive streaming
- Automatic compression based on connection speed
- Fallback poster images for all videos

## Integration Points
- Calendly for consultation booking
- Google Analytics for detailed tracking
- Facebook Pixel for remarketing
- Email automation for lead nurturing