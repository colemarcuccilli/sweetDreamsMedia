const fs = require('fs')
const path = require('path')

// Your Supabase access token
const ACCESS_TOKEN = 'sbp_46d6bf2805576b2017c7f5bcc442f466454386b3'
const PROJECT_URL = 'https://fweeyjnqwxywmpmnqpts.supabase.co'

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

const sourceDir = 'C:\\Users\\cole\\Desktop\\SweetDreamsMusicLLC\\SweetDreamsBusiness\\media\\video\\edited'

async function uploadVideo(fileName) {
  const filePath = path.join(sourceDir, fileName)
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${fileName}`)
    return false
  }

  const fileSize = fs.statSync(filePath).size
  const sizeMB = (fileSize / (1024 * 1024)).toFixed(2)
  
  console.log(`📤 Uploading ${fileName} (${sizeMB} MB)...`)
  
  try {
    const fileBuffer = fs.readFileSync(filePath)
    
    const response = await fetch(`${PROJECT_URL}/storage/v1/object/portfolio-media/${fileName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'video/mp4',
        'x-upsert': 'true'
      },
      body: fileBuffer
    })

    if (!response.ok) {
      const error = await response.text()
      console.error(`❌ Failed to upload ${fileName}: ${error}`)
      return false
    }

    console.log(`✅ Successfully uploaded ${fileName}`)
    return true
  } catch (err) {
    console.error(`❌ Error uploading ${fileName}:`, err.message)
    return false
  }
}

async function uploadAll() {
  console.log('🎬 Starting upload process...\n')
  
  let successCount = 0
  
  for (const video of videosToUpload) {
    const success = await uploadVideo(video)
    if (success) successCount++
    
    // Delay between uploads
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  console.log(`\n✅ Uploaded ${successCount} of ${videosToUpload.length} videos`)
  
  if (successCount === videosToUpload.length) {
    console.log('\n🎉 All videos uploaded successfully!')
    console.log('Next: Run node scripts/get-video-urls.js to get the signed URLs')
  }
}

uploadAll().catch(console.error)