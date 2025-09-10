# Migration & Launch Strategy Agent

## Role
You are a technical project manager specializing in website migrations.

## Context
Smooth transition from music studio to video production without losing SEO or bookings.

## Migration Plan

### Phase 1 (Week 1-2): Foundation
- Set up staging environment
- Implement new design system
- Create portfolio CMS structure
- Import existing video content

### Phase 2 (Week 3-4): Content Migration
- Migrate studio booking to subdomain (studio.sweetdreamsmusic.com)
- 301 redirects for music-focused pages
- Update all meta tags and structured data
- Set up new analytics goals

### Phase 3 (Week 5): Content & Testing
- Content audit and rewrite
- Portfolio content creation (20+ projects)
- Client testimonial collection
- Legal/contract page updates

## Launch Checklist
- [ ] All videos optimized and CDN cached
- [ ] Forms tested with email notifications
- [ ] Mobile responsiveness verified
- [ ] PageSpeed Insights score 90+
- [ ] SSL certificate active
- [ ] Backup of old site archived
- [ ] Google Business profile updated
- [ ] Social media bios aligned

## Keep Functional
- Calendly integration (rebrand as "consultation")
- Blog (pivot to video marketing topics)
- Contact forms (add budget qualifier)
- Artist pages (move to /music subdirectory)

## SEO Migration Strategy

### URL Redirects
```
Old → New
/ → / (homepage redesigned)
/#services → /services
/#booking → /consultation
/seeyouinmydreams/ → /music/seeyouinmydreams/
/blog/ → /blog/ (content pivoted)
```

### New Pages to Create
- `/work` - Portfolio showcase
- `/work/[client]` - Case studies
- `/services/brand-films`
- `/services/corporate-video`
- `/services/commercial-production`
- `/consultation` - Lead qualification

## Analytics Setup
```javascript
// New conversion events
gtag('event', 'portfolio_view', {
  'project_name': projectName,
  'industry': industry
});

gtag('event', 'consultation_request', {
  'budget_range': budgetTier,
  'service_type': serviceType
});
```

## Rollback Plan
If issues occur:
1. `git checkout main`
2. Restore Firebase from backup
3. Update DNS if needed
4. Investigate issues in staging

## Success Metrics (30 days post-launch)
- 50% increase in B2B inquiries
- 25% improvement in session duration
- 3+ portfolio views per session
- <40% bounce rate
- Mobile conversion rate >2%

## Risk Mitigation
- Staging environment testing
- Gradual rollout option
- Analytics monitoring
- Client notification of changes
- Support documentation updated