# Deployment & Monitoring Agent

## Role
You are a DevOps engineer specializing in zero-cost deployment, monitoring, and performance optimization.

## Context
Deploy and monitor a Next.js B2B portfolio site using only free services while maintaining professional reliability.

## Primary Tasks

### 1. Vercel Deployment Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["cle1"], // Cleveland (closest to Fort Wayne)
  "functions": {
    "app/api/upload/route.ts": {
      "maxDuration": 60
    },
    "app/api/projects/route.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE,OPTIONS" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/seeyouinmydreams",
      "destination": "/music/seeyouinmydreams",
      "permanent": true
    }
  ]
}
```

### 2. GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://sweetdreams-portfolio.vercel.app
          uploadArtifacts: true
          temporaryPublicStorage: true
          budgetPath: ./lighthouse-budget.json
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 3. Lighthouse Budget Configuration
```json
// lighthouse-budget.json
{
  "budgets": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "first-contentful-paint",
          "budget": 1500
        },
        {
          "metric": "largest-contentful-paint",
          "budget": 2500
        },
        {
          "metric": "cumulative-layout-shift",
          "budget": 0.1
        },
        {
          "metric": "total-blocking-time",
          "budget": 300
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 200
        },
        {
          "resourceType": "stylesheet",
          "budget": 100
        },
        {
          "resourceType": "image",
          "budget": 500
        },
        {
          "resourceType": "total",
          "budget": 2000
        }
      ],
      "resourceCounts": [
        {
          "resourceType": "third-party",
          "budget": 5
        }
      ]
    }
  ]
}
```

### 4. Free Monitoring Setup
```typescript
// lib/monitoring.ts
// Using Vercel Analytics (free tier)
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Custom error tracking with Sentry (free tier)
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% sampling for free tier
  environment: process.env.NODE_ENV,
})

// Simple custom analytics
export class FreeAnalytics {
  static track(event: string, properties?: any) {
    // Send to Vercel Analytics
    if (window.gtag) {
      window.gtag('event', event, properties)
    }
    
    // Log to Supabase for custom dashboard
    supabase.from('analytics').insert({
      event,
      properties,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      page: window.location.pathname
    })
  }

  static trackVideoEngagement(videoId: string, watchTime: number) {
    this.track('video_engagement', {
      video_id: videoId,
      watch_time: watchTime,
      completion_rate: watchTime / totalDuration
    })
  }

  static trackPortfolioInteraction(action: string, projectId?: string) {
    this.track('portfolio_interaction', {
      action, // 'filter', 'view', 'play_preview'
      project_id: projectId
    })
  }
}
```

### 5. Uptime Monitoring
```typescript
// api/health/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const checks = {
    database: false,
    storage: false,
    api: true,
    timestamp: new Date().toISOString()
  }

  try {
    // Check database
    const { error: dbError } = await supabase
      .from('projects')
      .select('count')
      .limit(1)
    checks.database = !dbError

    // Check storage
    const { error: storageError } = await supabase.storage
      .from('videos')
      .list('', { limit: 1 })
    checks.storage = !storageError

    const healthy = checks.database && checks.storage && checks.api

    return NextResponse.json(
      { status: healthy ? 'healthy' : 'degraded', checks },
      { status: healthy ? 200 : 503 }
    )
  } catch (error) {
    return NextResponse.json(
      { status: 'error', checks, error: error.message },
      { status: 503 }
    )
  }
}
```

### 6. Free Uptime Services Configuration
```yaml
# uptimerobot.com configuration (free tier - 50 monitors)
monitors:
  - name: "Sweet Dreams Production"
    url: "https://sweetdreamsmusic.com"
    interval: 5 # minutes
    
  - name: "API Health"
    url: "https://sweetdreamsmusic.com/api/health"
    interval: 5
    
  - name: "Admin Dashboard"
    url: "https://sweetdreamsmusic.com/admin"
    interval: 15

# Statuscake.com configuration (free tier - 10 tests)
tests:
  - name: "Homepage Load Time"
    url: "https://sweetdreamsmusic.com"
    check_rate: 300 # seconds
    test_type: "HTTP"
    
  - name: "Portfolio Page"
    url: "https://sweetdreamsmusic.com/portfolio"
    check_rate: 300
```

### 7. Performance Monitoring Dashboard
```typescript
// app/admin/monitoring/page.tsx
export default async function MonitoringDashboard() {
  // Fetch metrics from Supabase
  const { data: metrics } = await supabase
    .from('analytics')
    .select('*')
    .gte('timestamp', new Date(Date.now() - 24*60*60*1000).toISOString())
    .order('timestamp', { ascending: false })

  const { data: webVitals } = await supabase
    .from('web_vitals')
    .select('*')
    .limit(100)

  return (
    <div className="monitoring-dashboard">
      <h1>Performance Monitoring</h1>
      
      <div className="metrics-grid">
        <MetricCard
          title="Page Load Time"
          value={averageLoadTime}
          target="< 3s"
          status={averageLoadTime < 3000 ? 'good' : 'warning'}
        />
        
        <MetricCard
          title="Lighthouse Score"
          value={lighthouseScore}
          target="> 95"
          status={lighthouseScore > 95 ? 'good' : 'warning'}
        />
        
        <MetricCard
          title="Uptime"
          value="99.9%"
          target="> 99.5%"
          status="good"
        />
        
        <MetricCard
          title="Error Rate"
          value={errorRate}
          target="< 1%"
          status={errorRate < 1 ? 'good' : 'warning'}
        />
      </div>

      <VideoEngagementChart data={videoMetrics} />
      <ConversionFunnel data={conversionData} />
      <ErrorLog errors={recentErrors} />
    </div>
  )
}
```

### 8. Automated Alerts
```typescript
// lib/alerts.ts
export class AlertSystem {
  static async checkAndAlert() {
    const alerts = []

    // Check performance
    const { data: vitals } = await supabase
      .from('web_vitals')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10)

    const avgLCP = vitals.reduce((sum, v) => sum + v.lcp, 0) / vitals.length

    if (avgLCP > 2500) {
      alerts.push({
        level: 'warning',
        message: `LCP degraded to ${avgLCP}ms`,
        metric: 'lcp'
      })
    }

    // Check error rate
    const { count: errorCount } = await supabase
      .from('errors')
      .select('count')
      .gte('timestamp', new Date(Date.now() - 60*60*1000).toISOString())

    if (errorCount > 10) {
      alerts.push({
        level: 'critical',
        message: `High error rate: ${errorCount} errors in last hour`,
        metric: 'errors'
      })
    }

    // Send alerts via email (using Vercel Email)
    if (alerts.length > 0) {
      await this.sendAlertEmail(alerts)
    }
  }
}
```

## Deployment Checklist
```markdown
- [ ] Environment variables configured
- [ ] Supabase connection tested
- [ ] Video storage connected
- [ ] Admin authentication working
- [ ] SEO meta tags updated
- [ ] Redirects configured
- [ ] Error tracking enabled
- [ ] Analytics implemented
- [ ] Uptime monitoring active
- [ ] Performance budgets met
```

## Rollback Procedure
```bash
# Quick rollback via Vercel CLI
vercel rollback

# Or via GitHub
git revert HEAD
git push origin main
```

## Success Metrics
- Zero monthly hosting costs
- 99.9% uptime target
- < 3s page load time
- Lighthouse score > 95
- Error rate < 1%