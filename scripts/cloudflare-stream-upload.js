const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

// Cloudflare Stream API Configuration
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CLOUDFLARE_STREAM_API_TOKEN = process.env.CLOUDFLARE_STREAM_API_TOKEN

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_STREAM_API_TOKEN) {
  console.error('❌ Missing Cloudflare credentials in environment variables')
  console.log('Please add to your .env.local:')
  console.log('CLOUDFLARE_ACCOUNT_ID=your-account-id')
  console.log('CLOUDFLARE_STREAM_API_TOKEN=your-api-token')
  process.exit(1)
}

// Videos to upload (current header videos)
const VIDEO_FILES = [
  'hyperlapseFW.mp4',
  'V1-0001_A00000000.mp4',
  'V1-0003_A00000000.mp4', 
  'V1-0004_A00000000.mp4',
  'V1-0005_A00000000.mp4',
  'V1-0006_A00000000.mp4',
  'V1-0007_A00000000.mp4'
]

// Video directory path - update this to your actual video location
const VIDEO_DIR = 'C:\\Users\\cole\\Desktop\\SweetDreamsMusicLLC\\SweetDreamsBusiness\\media\\video\\edited'

/**
 * Upload a video file to Cloudflare Stream
 * @param {string} filePath - Full path to video file
 * @param {string} fileName - Name of the video file
 * @returns {Promise<Object>} - Cloudflare Stream response
 */
async function uploadToCloudflareStream(filePath, fileName) {
  try {
    console.log(`📤 Uploading ${fileName}...`)
    
    // Use curl for more reliable uploads
    const { exec } = require('child_process')
    
    return new Promise((resolve, reject) => {
      const cmd = `curl -X POST ` +
        `"https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream" ` +
        `-H "Authorization: Bearer ${CLOUDFLARE_STREAM_API_TOKEN}" ` +
        `-F "file=@${filePath}" ` +
        `-F "meta={\"name\":\"${fileName.replace('.mp4', '')}\"}"`
      
      exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Error uploading ${fileName}:`, error.message)
          resolve(null)
          return
        }
        
        try {
          const result = JSON.parse(stdout)
          
          if (!result.success) {
            throw new Error(`Upload failed: ${JSON.stringify(result.errors)}`)
          }
          
          console.log(`✅ ${fileName} uploaded successfully!`)
          console.log(`   Stream ID: ${result.result.uid}`)
          console.log(`   Preview URL: https://iframe.videodelivery.net/${result.result.uid}`)
          
          resolve(result.result)
          
        } catch (parseError) {
          console.error(`❌ Error parsing response for ${fileName}:`, parseError.message)
          console.log('Raw response:', stdout)
          resolve(null)
        }
      })
    })
    
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error.message)
    return null
  }
}

/**
 * Upload all header videos to Cloudflare Stream
 */
async function uploadAllVideos() {
  console.log('🎬 Starting Cloudflare Stream upload process...\n')
  
  const results = []
  
  for (const fileName of VIDEO_FILES) {
    const filePath = path.join(VIDEO_DIR, fileName)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`)
      console.log(`   Skipping ${fileName}...`)
      continue
    }
    
    const result = await uploadToCloudflareStream(filePath, fileName)
    if (result) {
      results.push({
        fileName,
        streamId: result.uid,
        playbackId: result.playback?.id,
        previewUrl: `https://iframe.videodelivery.net/${result.uid}`,
        thumbnailUrl: `https://videodelivery.net/${result.uid}/thumbnails/thumbnail.jpg`,
        duration: result.duration || 30 // Will be updated after processing
      })
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  // Output results for database update
  console.log('\n📋 Upload Summary:')
  console.log('Copy this data for updating your database:\n')
  
  results.forEach(video => {
    console.log(`${video.fileName}:`)
    console.log(`  Stream ID: ${video.streamId}`)
    console.log(`  Preview URL: ${video.previewUrl}`)
    console.log(`  Thumbnail: ${video.thumbnailUrl}`)
    console.log('')
  })
  
  // Generate update SQL
  console.log('\n📝 SQL for updating header_videos table:')
  results.forEach(video => {
    const name = video.fileName.replace('.mp4', '')
    console.log(`UPDATE header_videos SET cloudflare_stream_id = '${video.streamId}', cloudflare_stream_url = '${video.previewUrl}', cloudflare_thumbnail_url = '${video.thumbnailUrl}', migration_status = 'completed' WHERE name = '${name}';`)
  })
  
  console.log(`\n✅ Uploaded ${results.length}/${VIDEO_FILES.length} videos successfully!`)
}

// Check if this script is being run directly
if (require.main === module) {
  uploadAllVideos().catch(console.error)
}

module.exports = { uploadToCloudflareStream, uploadAllVideos }