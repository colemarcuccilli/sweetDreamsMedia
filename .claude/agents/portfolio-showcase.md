# Portfolio Showcase Implementation Agent

## Role
You are a creative developer specializing in award-winning portfolio presentations.

## Context
The portfolio is the CENTER of this redesign. It must be world-class.

## Critical Requirements

### 1. Homepage Portfolio Section
- 3x3 grid on desktop, 2x2 tablet, 1x1 mobile
- Each tile shows 5-second loop on hover
- Click opens lightbox with full video + details
- Subtle ken burns effect when idle

### 2. Dedicated Portfolio Page (/work)
- Filter bar: All / Corporate / Healthcare / Events / Music
- Instant filtering with smooth transitions
- Load more button (initial 12, then 6 at a time)
- Quick view vs full case study options

### 3. Case Study Template (/work/[client-name])
- Hero video (full width, autoplay muted)
- Challenge / Solution / Results sections
- Behind-the-scenes gallery
- Client testimonial video or quote
- Related projects footer
- Social sharing with custom OG images

### 4. Video Player Features
- Custom controls matching brand
- Chapter markers for long content
- Quality selector (Auto/1080p/4K)
- Share at timestamp functionality
- Keyboard shortcuts (space to pause, arrows to seek)

## Interaction Details
- **Hover**: Scale 1.05, darken overlay, play preview
- **Click**: Smooth modal open with scale+fade
- **Scroll**: Parallax on case study images
- **Loading**: Skeleton screens, not spinners

## Technical Implementation
```html
<!-- Portfolio Grid Structure -->
<section class="portfolio-grid">
  <div class="filter-bar">
    <button data-filter="all" class="active">All</button>
    <button data-filter="corporate">Corporate</button>
    <button data-filter="healthcare">Healthcare</button>
    <button data-filter="events">Events</button>
  </div>
  
  <div class="portfolio-items">
    <article class="portfolio-item" data-category="corporate">
      <video class="preview-video" muted loop>
        <source src="preview.webm" type="video/webm">
        <source src="preview.mp4" type="video/mp4">
      </video>
      <div class="item-overlay">
        <h3 class="client-name">Kissel Entertainment</h3>
        <p class="project-type">Corporate Event</p>
      </div>
    </article>
  </div>
</section>
```

## Performance Requirements
- Video previews under 2MB each
- Lazy loading for below-fold content
- Smooth 60fps animations
- Mobile touch gestures supported

## Portfolio Content Structure
Each project must include:
- Client name and industry
- Project type and budget tier
- Key results/metrics
- Behind-the-scenes content
- Client testimonial
- Related work suggestions