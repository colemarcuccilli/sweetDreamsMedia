const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client  
const supabaseUrl = 'https://fweeyjnqwxywmpmnqpts.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZWV5am5xd3h5d21wbW5xcHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzU2OTQsImV4cCI6MjA3MTc1MTY5NH0.-vLqNDwbpA3zpJh45VFB5Oo2ehnBdLaLlNMDi1o75m4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Videos already uploaded (based on what you told me)
const uploadedVideos = [
  'hyperlapseFW.mp4',
  'V1-0001_A00000000.mp4', 
  'V1-0003_A00000000.mp4',
  'V1-0004_A00000000.mp4',
  'V1-0005_A00000000.mp4',
  'V1-0006_A00000000.mp4',
  'V1-0007_A00000000.mp4',
  'HyperLongVideo.mp4'
]

async function getSignedUrls() {
  console.log('🎬 Getting signed URLs for uploaded videos...\n')
  
  const videoConfigs = []
  
  for (const fileName of uploadedVideos) {
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
        videoConfigs.push({
          name: fileName.replace('.mp4', ''),
          url: data.signedUrl,
          duration: 30 // Default duration, adjust as needed
        })
        console.log(`✅ Got URL for ${fileName}`)
      }
    } catch (err) {
      console.error(`❌ Error for ${fileName}:`, err.message)
    }
  }
  
  console.log('\n📋 Copy this configuration to src/components/VideoHeader.tsx:\n')
  console.log('const HEADER_VIDEOS: VideoConfig[] = [')
  
  videoConfigs.forEach((video, index) => {
    console.log('  {')
    console.log(`    name: '${video.name}',`)
    console.log(`    url: '${video.url}',`)
    console.log(`    duration: ${video.duration}`)
    console.log('  }' + (index < videoConfigs.length - 1 ? ',' : ''))
  })
  
  console.log(']')
  
  console.log('\n📝 To upload remaining videos:')
  console.log('Go to: https://supabase.com/dashboard/project/fweeyjnqwxywmpmnqpts/storage/buckets/portfolio-media')
  console.log('Click "Upload files" and select your videos from:')
  console.log('C:\\Users\\cole\\Desktop\\SweetDreamsMusicLLC\\SweetDreamsBusiness\\media\\video\\edited')
}

// Run the script
getSignedUrls().catch(console.error)