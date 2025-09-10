# Claude Code Configuration - Sweet Dreams B2B Portfolio Redesign

## Project Overview
Transform sweetdreamsmusic.com from music studio to premium B2B video production portfolio site.

## Active Development Branch
**Current Branch**: `feature/b2b-portfolio-redesign`
**Status**: Development phase - NO production deployments
**Protection**: Main branch protected, all work in feature branch

## Agent Activation Priority
Execute agents in this order for optimal results:

### Phase 1: Foundation Setup
1. **Next.js Migration** (`nextjs-migration.md`)
   - Set up React/Next.js project structure
   - Configure TypeScript and Tailwind
   - Establish component architecture

2. **Supabase & Admin** (`supabase-admin.md`)
   - Set up free Supabase database
   - Build admin dashboard interface
   - Configure authentication system

### Phase 2: Core Development
3. **Portfolio Architecture** (`portfolio-architect.md`)
   - Restructure information architecture
   - Plan portfolio showcase system
   - Design service page hierarchy

4. **Visual Design & Frontend** (`visual-design-frontend.md`)
   - Implement cinematic visual language  
   - Create homepage hero section
   - Build responsive grid systems

5. **Animation & Interaction** (`animation-interaction.md`)
   - Implement Framer Motion animations
   - Create scroll-triggered effects
   - Build magnetic cursor interactions

6. **Portfolio Showcase** (`portfolio-showcase.md`)
   - Implement video preview system
   - Create filtering functionality
   - Build case study templates

### Phase 3: Optimization
7. **Video Optimization** (`video-optimization.md`)
   - Set up video compression pipeline
   - Configure free CDN services
   - Implement adaptive loading

8. **Content & Copy** (`content-copy-optimization.md`)
   - Transform all messaging B2B focus
   - Optimize for target keywords
   - Write ROI-focused service descriptions

### Phase 4: Deployment
9. **Backend & CMS** (`backend-cms.md`)
   - Finalize video delivery system
   - Complete lead qualification
   - Configure analytics tracking

10. **Deployment & Monitoring** (`deployment-monitoring.md`)
    - Deploy to Vercel free tier
    - Set up monitoring systems
    - Configure automated alerts

11. **Migration & Launch** (`migration-launch.md`)
    - Execute final migration
    - Update DNS and redirects
    - Monitor post-launch metrics

## Context Files Priority
Read these files for complete understanding:

1. `business-context.md` - Complete business transformation strategy
2. `technical-requirements.md` - Performance and compatibility standards  
3. `brand-guidelines.md` - Visual identity and messaging framework

## Critical Success Factors

### Portfolio is Primary
- 70% of site emphasis on portfolio showcase
- World-class video preview experience
- Seamless case study navigation
- Mobile-first responsive design

### B2B Client Focus
- Target $3,500-$50,000+ projects
- Emphasize ROI and business results
- Professional, premium presentation
- Clear service tier differentiation

### Technical Excellence
- Lighthouse score 95+ required
- Video optimization <2MB previews
- Cross-browser compatibility
- Accessibility compliance

## Forbidden Actions
- NO direct commits to main branch
- NO deployment until 100% tested
- NO stock footage in portfolio
- NO autoplay with sound
- NO generic templates or themes

## Testing Protocol
Before any production deployment:
- [ ] Local testing completed
- [ ] Mobile responsiveness verified  
- [ ] Video optimization confirmed
- [ ] Form functionality tested
- [ ] Cross-browser testing completed
- [ ] Lighthouse audit passed (95+)
- [ ] SEO optimization verified

## Emergency Contacts
- Production issues: Immediately revert to main branch
- Client concerns: Maintain booking functionality at all times
- Technical problems: Use DEV-WORKFLOW.md rollback procedures

## Development Environment

### Tech Stack (Zero Cost)
- **Framework**: Next.js 14 with React 18
- **Database**: Supabase (500MB free tier)
- **Storage**: Firebase (5GB) + Supabase (1GB)
- **Video CDN**: Cloudinary (25GB free)
- **Hosting**: Vercel (free tier)
- **Monitoring**: Vercel Analytics + UptimeRobot
- **Error Tracking**: Sentry (free tier)

### Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Check TypeScript
npm run type-check

# Lint code
npm run lint
```

### Git Workflow
- Feature branch → PR review → Main
- Automated deployment via Vercel
- Lighthouse CI checks on PRs
- Rollback capability via Vercel

This configuration ensures safe, systematic development while maintaining production stability.