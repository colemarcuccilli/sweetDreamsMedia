@echo off
echo Uploading videos to Supabase...

set TOKEN=sbp_46d6bf2805576b2017c7f5bcc442f466454386b3

REM Upload each video using curl
echo Uploading V1-0009_A00000000.mp4...
curl -X POST "https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/portfolio-media/V1-0009_A00000000.mp4" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: video/mp4" ^
  --data-binary "@C:\Users\cole\Desktop\SweetDreamsMusicLLC\SweetDreamsBusiness\media\video\edited\V1-0009_A00000000.mp4"

echo.
echo Uploading V1-0010_A00000000.mp4...
curl -X POST "https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/portfolio-media/V1-0010_A00000000.mp4" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: video/mp4" ^
  --data-binary "@C:\Users\cole\Desktop\SweetDreamsMusicLLC\SweetDreamsBusiness\media\video\edited\V1-0010_A00000000.mp4"

echo.
echo Upload complete!
pause