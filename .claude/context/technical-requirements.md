# Technical Requirements - B2B Portfolio Website

## Performance Standards
All agents must ensure the website meets these technical requirements:

### Core Performance Metrics
- **Lighthouse Score**: 95+ on all metrics (Performance, Accessibility, Best Practices, SEO)
- **Page Load Time**: <3 seconds on 4G connection
- **Total Page Weight**: <5MB including video content
- **Mobile Performance**: Equal to desktop experience

### Video Optimization Requirements
- **Preview Videos**: <2MB each (WebM + MP4 fallbacks)
- **Full Videos**: Adaptive bitrate streaming via CDN
- **Compression**: H.265 encoding for optimal quality/size ratio
- **Fallbacks**: Poster images for slow connections
- **Autoplay**: Muted only, respect user preferences

### Browser Compatibility
- **Primary**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Fallbacks**: Progressive enhancement for older browsers

### Accessibility Standards
- **WCAG**: 2.1 AA compliance minimum
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Motion**: Respect `prefers-reduced-motion` settings

## Technology Stack

### Frontend
- **HTML5**: Semantic markup, no framework dependencies
- **CSS**: Modern CSS Grid + Flexbox, CSS custom properties
- **JavaScript**: Vanilla JS or minimal libraries (GSAP for animations)
- **Fonts**: Google Fonts (Playfair Display, Inter)

### Video Delivery
- **CDN**: CloudFront or similar
- **Hosting**: Cloudinary, Mux, or Vimeo Pro
- **Formats**: WebM (primary), MP4 (fallback), poster images
- **Quality Options**: Auto, 720p, 1080p, 4K (where applicable)

### Analytics & Tracking
- **Google Analytics**: Enhanced ecommerce for conversion tracking
- **Video Analytics**: Watch time, engagement, replay rate
- **Heatmaps**: User interaction tracking on portfolio
- **A/B Testing**: Framework for CTA optimization

### Development Tools
- **Version Control**: Git with feature branch workflow
- **Local Development**: Python HTTP server or Node.js serve
- **Testing**: Manual testing on real devices
- **Deployment**: Firebase Hosting

## Security Requirements
- **SSL**: HTTPS everywhere
- **Forms**: CSRF protection and validation
- **Content**: No sensitive data in frontend code
- **Headers**: Proper security headers configured

## SEO Technical Requirements

### Meta Tags
- Unique title tags for all pages (<60 characters)
- Compelling meta descriptions (<160 characters)
- Open Graph and Twitter Card tags
- Canonical URLs for duplicate content

### Structured Data
```json
{
  "@type": "VideoProduction",
  "name": "Sweet Dreams Production",
  "description": "Premium B2B video production",
  "url": "https://sweetdreamsmusic.com",
  "serviceArea": "Fort Wayne, Indianapolis, Chicago"
}
```

### XML Sitemap
- Updated for new B2B page structure
- Video sitemap for portfolio content
- Proper priority and change frequency

## Mobile Optimization
- **Responsive Design**: Mobile-first approach
- **Touch Targets**: Minimum 44px tap targets
- **Gestures**: Swipe, pinch-to-zoom where appropriate
- **Performance**: Optimized for mobile data usage

## Backup & Recovery
- **Git**: All code versioned with detailed commit messages
- **Content**: Regular backups of video content and metadata
- **Database**: If implementing CMS, automated backups
- **Rollback**: Tested recovery procedures

## Monitoring & Maintenance
- **Uptime**: 99.9% availability target
- **Performance**: Regular Lighthouse audits
- **Security**: Dependency updates and vulnerability scanning
- **Content**: Regular review of portfolio content and client permissions

## Integration Requirements
- **Calendly**: Consultation booking (rebrand messaging)
- **Email**: Automated sequences for lead nurturing
- **CRM**: Lead scoring and qualification system
- **Social Media**: Sharing capabilities with custom OG images

## Development Standards
- **Code Quality**: Clean, commented, maintainable code
- **Git Workflow**: Feature branches, PR reviews, no direct commits to main
- **Testing**: Local testing before any deployment
- **Documentation**: Clear README and inline documentation