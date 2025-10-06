#!/bin/bash

# 🚀 NIMA Portfolio Deployment Script
# This script builds and deploys your portfolio to Vercel

echo "🎨 Building NIMA Portfolio for production..."

# Build the project
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Deploying to Vercel..."
    
    # Deploy to Vercel
    vercel --prod
    
    echo "🎉 Deployment complete!"
    echo "Your portfolio is now live on Vercel!"
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi
