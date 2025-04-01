# Insight Farcaster Frame Deployment Guide

This guide will help you deploy the Insight Farcaster Frame to Vercel.

## Prerequisites

1. A Vercel account
2. A domain name (optional, but recommended)
3. A Farcaster account

## Environment Variables

Make sure to set the following environment variables in your Vercel project:

- `NEXT_PUBLIC_HOST`: Your application's URL (e.g., https://insight.yourdomain.com)
- `FARCASTER_HUB_URL`: The URL of the Farcaster Hub (e.g., https://hub.farcaster.xyz:2281)

## Deployment Steps

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: next build
     - Output Directory: .next
   - Add the environment variables
   - Click "Deploy"

3. **Configure your domain (optional)**
   - In your Vercel project dashboard, go to "Settings" > "Domains"
   - Add your custom domain

4. **Verify Farcaster Frame**
   - Make sure the `.well-known/farcaster.json` file is accessible at your domain
   - Test your frame by sharing it on Farcaster

## Testing Your Frame

1. Visit your deployed application
2. Share the URL on Farcaster
3. The frame should appear in the Farcaster client
4. Test the "Analyze My Activity" button
5. Test the "Share as Cast" button

## Troubleshooting

- If the frame doesn't appear, check that your `NEXT_PUBLIC_HOST` environment variable is set correctly
- If the analytics don't work, check that your `FARCASTER_HUB_URL` environment variable is set correctly
- If the sharing doesn't work, check the frame protocol implementation in `app/api/frame/route.ts`

