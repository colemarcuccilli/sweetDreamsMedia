const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client  
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fweeyjnqwxywmpmnqpts.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZWV5am5xd3h5d21wbW5xcHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzU2OTQsImV4cCI6MjA3MTc1MTY5NH0.-vLqNDwbpA3zpJh45VFB5Oo2ehnBdLaLlNMDi1o75m4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client logos uploaded to Supabase Storage
const CLIENT_LOGOS = [
  'BrookfieldZooLogo.png',
  'CrookedLakeLogo.png',
  'IndyChildrensMuseumLogo.png',
  'KisselLogo.png',
  'nissanredlogo.png',
  'ODanielLogo.png',
  'RideWorxLogo.png',
  'SummitCityVintageLogo.jpg',
  'sweet dreams musicog logo trans.png',
  'TheLandingLogo.png',
  'TrustedDentalLogo.png',
  'VisitFortWayneLogo.png'
]

async function getClientLogoUrls() {
  console.log('🏢 Getting signed URLs for client logos...\n')
  
  const logoUrls = {}
  
  for (const fileName of CLIENT_LOGOS) {
    try {
      // Get signed URL (10 years)
      const { data, error } = await supabase.storage
        .from('portfolio-media')
        .createSignedUrl(fileName, 315360000) // 10 years in seconds

      if (error) {
        console.error(`❌ Error getting URL for ${fileName}:`, error.message)
        continue
      }

      if (data && data.signedUrl) {
        logoUrls[fileName] = data.signedUrl
        console.log(`✅ Got URL for ${fileName}`)
      }
    } catch (err) {
      console.error(`❌ Error for ${fileName}:`, err.message)
    }
  }
  
  console.log('\n📋 Client Logo URLs:\n')
  
  // Output SQL to update projects with logo URLs
  console.log('-- Update portfolio projects with client logos')
  
  // Map logos to projects
  const logoMappings = [
    { project: 'indianapolis-childrens-museum-ferris-wheel', logo: 'IndyChildrensMuseumLogo.png' },
    { project: 'brookfield-zoo-ferris-wheel', logo: 'BrookfieldZooLogo.png' },
    { project: 'aegis-dental-trusted-dentistry', logo: 'TrustedDentalLogo.png' },
    { project: 'fort-wayne-carnival-recap', logo: 'KisselLogo.png' },
    { project: 'odaniel-cars-commercial', logo: 'ODanielLogo.png' },
    { project: 'nissan-warsaw-dealership', logo: 'nissanredlogo.png' },
    { project: 'vintage-fest-fort-wayne', logo: 'SummitCityVintageLogo.jpg' },
    { project: 'crooked-lake-music-festival-recap', logo: 'CrookedLakeLogo.png' },
    { project: 'sweet-dreams-recording-studio', logo: 'sweet dreams musicog logo trans.png' }
  ]
  
  logoMappings.forEach(mapping => {
    if (logoUrls[mapping.logo]) {
      console.log(`UPDATE portfolio_projects SET client_logo_url = '${logoUrls[mapping.logo]}' WHERE slug = '${mapping.project}';`)
    }
  })
  
  console.log(`\n✅ Generated ${logoMappings.length} logo URL mappings!`)
  
  // Also output JSON for reference
  console.log('\n📝 Logo URLs JSON:')
  console.log(JSON.stringify(logoUrls, null, 2))
}

// Run the script
getClientLogoUrls().catch(console.error)