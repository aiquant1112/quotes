#!/bin/bash

# Deploy database migrations
supabase db push

# Deploy Edge Functions
supabase functions deploy rotate-daily-quote --no-verify-jwt

# Create cron job for daily quote rotation
supabase functions cron create rotate-daily-quote "0 0 * * *" --no-verify-jwt

echo "Supabase deployment completed successfully!" 