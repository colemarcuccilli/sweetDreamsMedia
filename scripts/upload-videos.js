const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Initialize Supabase client
const supabaseUrl = 'https://fweeyjnqwxywmpmnqpts.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZWV5am5xd3h5d21wbW5xcHRzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE3NTY5NCwiZXhwIjoyMDcxNzUxNjk0fQ.NnmkVFRPZ5iW-gwYQSBPouSpWgkn0XZyjhcY9__zLE'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Videos to upload
const videosToUpload = [
  'V1-0009_A00000000.mp4',
  'V1-0010_A00000000.mp4',
  'V1-0011_A00000000.mp4',
  'V1-0012_A00000000.mp4',
  'V1-0013_A00000000.mp4',
  'V1-0014_A00000000.mp4',
  'V1-0015_A00000000.mp4',
  'toobig.mp4'
]

// Source directory
const sourceDir = 'C:\\Users\\cole\\Desktop\\SweetDreamsMusicLLC\\SweetDreamsBusiness\\media\\video\\edited'

async function uploadVideo(fileName) {
  const filePath = path.join(sourceDir, fileName)
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${fileName}`)
    return null
  }

  const fileBuffer = fs.readFileSync(filePath)
  const fileSize = fs.statSync(filePath).size
  const sizeMB = (fileSize / (1024 * 1024)).toFixed(2)
  
  console.log(`📤 Uploading ${fileName} (${sizeMB} MB)...`)
  
  try {
    const { data, error } = await supabase.storage
      .from('portfolio-media')
      .upload(fileName, fileBuffer, {
        contentType: 'video/mp4',
        upsert: true
      })

    if (error) {
      console.error(`❌ Error uploading ${fileName}:`, error.message)
      return null
    }

    console.log(`✅ Successfully uploaded ${fileName}`)
    
    // Get signed URL (10 years)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('portfolio-media')
      .createSignedUrl(fileName, 315360000) // 10 years in seconds

    if (urlError) {
      console.error(`❌ Error creating signed URL for ${fileName}:`, urlError.message)
      return null
    }

    return {
      fileName,
      url: signedUrlData.signedUrl,
      size: sizeMB
    }
  } catch (err) {
    console.error(`❌ Upload failed for ${fileName}:`, err.message)
    return null
  }
}

async function uploadAllVideos() {
  console.log('🎬 Starting video upload process...\n')
  
  const uploadedVideos = []
  
  for (const video of videosToUpload) {
    const result = await uploadVideo(video)
    if (result) {
      uploadedVideos.push(result)
    }
    // Add delay between uploads to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  console.log('\n📊 Upload Summary:')
  console.log('=================')
  console.log(`✅ Successfully uploaded: ${uploadedVideos.length}`)
  console.log(`❌ Failed: ${videosToUpload.length - uploadedVideos.length}`)
  
  if (uploadedVideos.length > 0) {
    console.log('\n🔗 Video URLs for VideoHeader component:\n')
    uploadedVideos.forEach(video => {
      console.log(`// ${video.fileName} (${video.size} MB)`)
      console.log(`{`)
      console.log(`  name: '${video.fileName.replace('.mp4', '')}',`)
      console.log(`  url: '${video.url}',`)
      console.log(`  duration: 30`)
      console.log(`},\n`)
    })
  }
}

// Run the upload
uploadAllVideos().catch(console.error)