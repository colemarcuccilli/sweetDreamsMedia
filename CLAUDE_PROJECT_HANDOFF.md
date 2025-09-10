# Sweet Dreams Media Portfolio Project - Claude Handoff Instructions

## 🎬 Project Context & Business Overview

You are Claude Code working on **Sweet Dreams Media** - a premium B2B video production company serving Fortune 500 companies and innovative brands. This is a complete handoff from the previous Claude session.

### Business Model
- **Target Market**: B2B corporations, healthcare, entertainment venues, museums
- **Services**: Corporate video production, brand films, commercial content, event coverage
- **Existing Clients**: Kissel Entertainment ($3,500 Children's Museum project), Aegis Dental Group, zoo productions
- **NO PRICING** displayed on website (business decision - prices handled in consultations)

### Two-Domain Strategy
1. **sweetdreamsmusic.com** - Recording studio (separate repo, static HTML, Firebase)
2. **sweetdreamsprod.com** - Video production company (THIS repo, Next.js, Vercel)

## 📂 Current Repository Status

**Location**: `C:\Users\cole\Desktop\SweetDreamsMusicLLC\sweetDreamsMedia`
**Framework**: Next.js 15 with TypeScript, Tailwind CSS, Supabase
**Branch**: Main (freshly moved from feature/b2b-portfolio-redesign)

## 🔧 Technical Stack & Configuration

### Environment Setup
```
NEXT_PUBLIC_SUPABASE_URL=https://fweeyjnqwxywmpmnqpts.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZWV5am5xd3h5d21wbW5xcHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzU2OTQsImV4cCI6MjA3MTc1MTY5NH0.-vLqNDwbpA3zpJh45VFB5Oo2ehnBdLaLlNMDi1o75m4
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZWV5am5xd3h5d21wbW5xcHRzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE3NTY5NCwiZXhwIjoyMDcxNzUxNjk0fQ.NnmkVFRPZ5iW-gwYQSBPouSpWgkn0XZyjhcY9__zLE
ADMIN_PASSWORD_HASH=$2b$12$rfoN8h9GsZ3oWnbd9J/yeeY0GKeaT38p9Xgk.KpuHE2Vmjw2TEGVG

# Cloudflare Stream (TO BE ADDED)
CLOUDFLARE_ACCOUNT_ID=[your-account-id]
CLOUDFLARE_STREAM_API_TOKEN=[your-api-token]
```

### Supabase Database
- **Project**: fweeyjnqwxywmpmnqpts.supabase.co (Pro tier, 1GB file uploads)
- **Tables**: portfolio_projects, blog_posts, testimonials, contact_submissions, admin_users
- **Storage**: portfolio-media bucket with 7 videos uploaded (10-year signed URLs)

### Design System
- **Colors**: Pure black (#000), white (#fff), gold (#d4af37)
- **Typography**: Playfair Display (serif headers), Inter (sans body)
- **Style**: Cinematic, premium B2B aesthetic

## 🎥 Video Header Status & Migration Plan

**7 Videos Currently Active** (rotating header with seamless transitions):
- hyperlapseFW.mp4 (30s) - **TO MIGRATE** to Cloudflare Stream
- V1-0001_A00000000.mp4 (25s) - **TO MIGRATE** to Cloudflare Stream
- V1-0003_A00000000.mp4 (20s) - **TO MIGRATE** to Cloudflare Stream
- V1-0004_A00000000.mp4 (30s) - **TO MIGRATE** to Cloudflare Stream
- V1-0005_A00000000.mp4 (25s) - **TO MIGRATE** to Cloudflare Stream
- V1-0006_A00000000.mp4 (20s) - **TO MIGRATE** to Cloudflare Stream
- V1-0007_A00000000.mp4 (35s) - **TO MIGRATE** to Cloudflare Stream

**Additional Videos to Upload** (user has these ready):
- V1-0009 through V1-0015_A00000000.mp4 - **UPLOAD DIRECT** to Cloudflare Stream
- toobig.mp4 - **UPLOAD DIRECT** to Cloudflare Stream

**Migration Benefits**:
- Eliminates multi-GB file loading issues
- Automatic adaptive bitrate streaming 
- Global CDN delivery optimization
- Professional video player with controls
- Significant performance improvement for SEO

## 🎯 Immediate Next Steps & Priorities

### 1. **Deploy to Vercel** (CRITICAL)
```
Framework: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Environment Variables: (see above)
Domain: sweetdreamsprod.com
```

### 2. **Complete Portfolio Showcase**
- Build portfolio grid component with video previews
- Implement filtering by category (corporate, commercial, documentary, event, music)
- Add case study pages with ROI metrics and client testimonials

### 3. **Cloudflare Stream Migration** (NEW PRIORITY)
- Migrate from Supabase Storage to Cloudflare Stream for video hosting
- Reduces loading times from multi-GB files to optimized streaming
- Cost-effective: ~$1/1000 minutes stored + $1/1000 minutes delivered
- Automatic adaptive bitrate, global CDN, professional delivery
- Update VideoHeader component to use Cloudflare Stream player
- Migrate existing 7 videos + add remaining V1-0009 through V1-0015

### 4. **Admin Dashboard** 
- File upload interface for new videos (via Cloudflare Stream API)
- Portfolio project management (CRUD operations)
- Contact form submissions management

### 5. **Contact & Lead Qualification**
- Multi-step contact form with project details
- Budget qualification (without showing prices)
- Calendly integration for consultation booking

## 📋 Claude Code Agent Instructions

The previous Claude created 11 specialized agents for this project. **USE THESE AGENTS PROACTIVELY**:

### Core Agents to Reference:
1. **Portfolio Architecture** - Site structure and navigation strategy
2. **Visual Design & Frontend** - GSAP animations, cinematic UI components  
3. **Backend & CMS** - Supabase integration, admin functionality
4. **Content & Copy** - B2B messaging optimization
5. **Portfolio Showcase** - Video player, filtering, case studies
6. **Migration & Launch** - Deployment and SEO optimization

**Important**: Review `.claude/agents/` directory for complete agent specifications.

## 💼 Business Requirements

### Target Messaging
- **FROM**: "Fort Wayne's premier recording studio" 
- **TO**: "Cinematic Storytelling for Ambitious Brands"
- **Keywords**: "corporate video production fort wayne", "B2B video content agency indiana"

### Success Metrics Target
- 50% increase in B2B inquiries within 60 days
- Average session duration >2 minutes
- Portfolio page views >3 per session
- Bounce rate <40%
- Mobile traffic conversion >2%

### Content Strategy
- Real client work only (no stock footage)
- Case studies with ROI metrics
- Behind-the-scenes content
- Client testimonials with permission

## 🚀 Development Commands

```bash
# Local development
npm run dev  # http://localhost:3000

# Build and test
npm run build
npm run start

# Supabase (if needed)
npx supabase login --token [your-token]
node scripts/get-video-urls.js
```

## 🎨 Key Components Status

### ✅ Completed
- VideoHeader with rotating videos and seamless transitions
- Base layout with proper typography and design system
- Supabase integration with authentication
- Database schema with all required tables

### 🔄 In Progress / Next
- Portfolio grid and filtering
- Individual case study pages
- Admin dashboard
- Contact form with lead qualification
- SEO optimization and meta tags

## 📝 Instructions for New Claude Session

**Copy this EXACT prompt:**

---

I'm continuing work on Sweet Dreams Media's B2B video production portfolio website. Please read every file in this repository to understand the complete context, especially:

1. **Read CLAUDE_PROJECT_HANDOFF.md** (this file) - contains full project context
2. **Read all files in `.claude/agents/`** - specialized agent instructions  
3. **Read `src/components/VideoHeader.tsx`** - current video implementation
4. **Read `src/app/page.tsx`** - homepage structure
5. **Read all Supabase scripts in `scripts/`** - database integration
6. **Read `.env.local`** - environment configuration

**Key Context**: This is a premium B2B video production company (NOT a music studio). We have 7 videos rotating in the header, Supabase Pro with database setup, and need to complete the portfolio showcase and deploy to Vercel at sweetdreamsprod.com.

**Immediate Priority**: Deploy to Vercel and build out the portfolio grid component with video previews and case studies.

**Important**: Use the specialized agents proactively as defined in `.claude/agents/`. NO PRICING shown on site. Target Fortune 500 B2B clients.

---

## 🔗 Important Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/fweeyjnqwxywmpmnqpts
- **Supabase Storage**: https://supabase.com/dashboard/project/fweeyjnqwxywmpmnqpts/storage/buckets/portfolio-media
- **GitHub Repo**: https://github.com/colemarcuccilli/sweetDreamsMedia.git
- **Target Domain**: sweetdreamsprod.com (via Vercel)

## 💡 Critical Notes

1. **NO PRICING** anywhere on the site - business decision
2. **Real videos only** - no stock footage in portfolio
3. **B2B focus** - corporate clients, not individual artists
4. **Cinematic aesthetic** - premium, high-end visual design
5. **Video performance** - optimized for large files via Supabase Pro
6. **SEO ready** - structured for B2B keywords and conversion

This handoff ensures complete continuity of the project vision, technical implementation, and business strategy. The new Claude session will have everything needed to continue building this premium B2B portfolio website.