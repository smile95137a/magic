@echo off
@chcp 65001 >nul
setlocal

:: 設定變數
set DIST_PATH=dist
set S3_BUCKET=chifuweb
set CLOUDFRONT_ID=E1AO1I1OXYADWD

echo 🔧 Step 1: 建置前端專案 (npm run build:prod)...
call npm run build:prod
if %errorlevel% neq 0 (
    echo ❌ Build 失敗，結束部署。
    exit /b %errorlevel%
)

echo 📤 Step 2: 上傳至 S3 (s3://%S3_BUCKET%)...
aws s3 sync %DIST_PATH% s3://%S3_BUCKET% --delete
if %errorlevel% neq 0 (
    echo ❌ 上傳失敗，結束部署。
    exit /b %errorlevel%
)

echo 🚫 Step 3: CloudFront 快取失效 (/*)...
aws cloudfront create-invalidation --distribution-id %CLOUDFRONT_ID% --paths "/*"
if %errorlevel% neq 0 (
    echo ❌ 快取失效指令失敗。
    exit /b %errorlevel%
)

echo ✅ 部署完成！
pause
