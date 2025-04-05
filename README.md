# Insight - Farcaster Analytics Frame

Insight is a powerful Farcaster Frame that provides users with detailed analytics about their Farcaster activity. It analyzes user engagement, influence, and network reach, presenting the data in a visually appealing dashboard.

## Features

- **Real-time Analytics**: Fetches and analyzes real user data from the Farcaster Hub
- **Engagement Metrics**: Calculates engagement score, influence rate, and network reach
- **Beautiful Visualization**: Presents data in an intuitive, visually appealing dashboard
- **Sharing Capability**: Allows users to share their analytics as casts
- **Responsive Design**: Works on all devices and screen sizes
- **Farcaster Frame Integration**: Full support for Farcaster Frame protocol version 1

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Farcaster Frame SDK

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - `NEXT_PUBLIC_HOST`: Your application's URL
   - `FARCASTER_HUB_URL`: The URL of the Farcaster Hub (e.g., https://hub.farcaster.xyz:2281)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Farcaster Frame Integration

### Frame Configuration

The frame configuration is stored in the `.well-known/farcaster.json` file. This file includes:

- Account association details
- Frame metadata (name, icon, splash image, etc.)
- Webhook URL for server events

### Webhook Events

The app handles the following webhook events:
- `frame_added`: User adds the frame
- `frame_removed`: User removes the frame
- `notifications_enabled`: User enables notifications
- `notifications_disabled`: User disables notifications

### Notifications

The app supports sending notifications to users who have enabled them. Notifications include:
- A message about new analytics
- A target URL to view the analytics

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Final Checklist Before Deployment

- [ ] Update all URLs in `farcaster.json` to match your domain
- [ ] Set the `NEXT_PUBLIC_HOST` environment variable
- [ ] Set the `FARCASTER_HUB_URL` environment variable
- [ ] Replace placeholder images with actual images
- [ ] Test the frame locally
- [ ] Deploy to Vercel or your preferred hosting provider
- [ ] Test the frame in Farcaster clients

## License

MIT