#!/bin/bash

# Function to run vercel env add with background-kill pattern to prevent hanging
set_env() {
  local name=$1
  local env=$2
  local value=$3
  echo "Setting $name for $env..."
  npx vercel env add "$name" "$env" --value "$value" --yes --force &
  local pid=$!
  sleep 4
  kill -9 $pid 2>/dev/null || true
}

echo "=== STARTING ENVIRONMENT VARIABLES SYNC TO VERCEL ==="

# Production Environments
set_env "NEXT_PUBLIC_FIREBASE_API_KEY" "production" "AIzaSyDW5075X4k9QTJzRpkKClT48GYUgSiVpw4"
set_env "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" "production" "wk-smart-city-plc.firebaseapp.com"
set_env "NEXT_PUBLIC_FIREBASE_PROJECT_ID" "production" "wk-smart-city-plc"
set_env "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" "production" "wk-smart-city-plc.firebasestorage.app"
set_env "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" "production" "335014067510"
set_env "NEXT_PUBLIC_FIREBASE_APP_ID" "production" "1:335014067510:web:4c55a9f259133dcee04797"

set_env "SMTP_HOST" "production" "mail.wisdomkwatismartcityplc.com"
set_env "SMTP_PORT" "production" "465"
set_env "SMTP_USER" "production" "careers@wisdomkwatismartcityplc.com"
set_env "SMTP_PASS" "production" "careers67&"
set_env "SMTP_FROM" "production" "careers@wisdomkwatismartcityplc.com"
set_env "SMTP_TO" "production" "careers@wisdomkwatismartcityplc.com"

# Preview Environments
set_env "NEXT_PUBLIC_FIREBASE_API_KEY" "preview" "AIzaSyDW5075X4k9QTJzRpkKClT48GYUgSiVpw4"
set_env "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" "preview" "wk-smart-city-plc.firebaseapp.com"
set_env "NEXT_PUBLIC_FIREBASE_PROJECT_ID" "preview" "wk-smart-city-plc"
set_env "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" "preview" "wk-smart-city-plc.firebasestorage.app"
set_env "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" "preview" "335014067510"
set_env "NEXT_PUBLIC_FIREBASE_APP_ID" "preview" "1:335014067510:web:4c55a9f259133dcee04797"

set_env "SMTP_HOST" "preview" "mail.wisdomkwatismartcityplc.com"
set_env "SMTP_PORT" "preview" "465"
set_env "SMTP_USER" "preview" "careers@wisdomkwatismartcityplc.com"
set_env "SMTP_PASS" "preview" "careers67&"
set_env "SMTP_FROM" "preview" "careers@wisdomkwatismartcityplc.com"
set_env "SMTP_TO" "preview" "careers@wisdomkwatismartcityplc.com"

echo "=== ENVIRONMENT VARIABLES SYNC COMPLETED ==="
