import { Metadata } from 'next'
import InsightDashboard from '@/components/insight-dashboard'

const frameEmbed = {
  version: "next",
  imageUrl: "https://insight-rust.vercel.app/splash.png", // Replace with your actual preview image URL
  button: {
    title: "📊 View My Analytics",
    action: {
      type: "launch_frame",
      url: "https://insight-rust.vercel.app/", // Replace with your actual app URL
      name: "Insight",
      splashImageUrl: "https://insight-rust.vercel.app/splash.png", // Replace with your splash image
      splashBackgroundColor: "#0a0a1f"
    }
  }
}

export const metadata: Metadata = {
  title: 'Insight - Farcaster Analytics',
  description: 'Powerful analytics for your Farcaster activity',
  openGraph: {
    title: "Insight | Farcaster Analytics",
    description: "Powerful analytics for your Farcaster activity",
    images: ["/og-image.png"],
  },
  other: {
    'fc:frame': JSON.stringify(frameEmbed),
    "fc:frame:image": `${process.env.NEXT_PUBLIC_HOST}/og-image.png`,
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_HOST}/api/frame`,
    "fc:frame:button:1": "Analyze My Activity",
    "fc:frame:button:1:action": "post",
  },
}

export default function Page() {
  return <InsightDashboard />
}

