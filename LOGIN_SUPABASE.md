# Supabase CLI Login Instructions

## Step 1: Get Your Access Token

1. **Click this link to login and get your token:**
   https://supabase.com/dashboard/account/tokens

2. **Generate a new access token:**
   - Click "Generate new token"
   - Name it: "CLI Upload"
   - Copy the token (it starts with `sbp_`)

## Step 2: Set Your Token

Open PowerShell and run:
```powershell
$env:SUPABASE_ACCESS_TOKEN="paste-your-token-here"
```

## Step 3: Upload Videos

```powershell
cd C:\Users\cole\Desktop\SweetDreamsMusicLLC\SweetDreamsMusic\sweetdreamsprod

# Login with your token
npx supabase login --token $env:SUPABASE_ACCESS_TOKEN

# Link to your project
npx supabase link --project-ref fweeyjnqwxywmpmnqpts

# Upload a video
npx supabase storage cp "C:\Users\cole\Desktop\SweetDreamsMusicLLC\SweetDreamsBusiness\media\video\edited\V1-0009_A00000000.mp4" ss://portfolio-media/V1-0009_A00000000.mp4
```

## Alternative: Direct Dashboard Upload

Just go to your storage dashboard and drag & drop:
https://supabase.com/dashboard/project/fweeyjnqwxywmpmnqpts/storage/buckets/portfolio-media

This is probably easier for multiple large files!