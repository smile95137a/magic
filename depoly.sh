#!/bin/bash

set -e  # 一旦發生錯誤就中止腳本
set -o pipefail

# 變數設定
DIST_PATH="dist"
S3_BUCKET="chifuweb"
CLOUDFRONT_ID="E1AO1I1OXYADWD"

echo "🔧 Step 1: 建置前端專案 (npm run build:prod)..."
npm run build:prod

echo "📤 Step 2: 上傳至 S3 (s3://$S3_BUCKET)..."
aws s3 sync "$DIST_PATH" "s3://$S3_BUCKET" --delete

echo "🚫 Step 3: 執行 CloudFront 快取失效 (/*)..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_ID" \
  --paths "/*"

echo "✅ 部署完成！"
