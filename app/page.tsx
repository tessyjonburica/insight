import type { Metadata } from "next"
import InsightDashboard from "@/components/insight-dashboard"

export const metadata: Metadata = {
  title: "Insight | Farcaster Analytics",
  description: "Powerful analytics for your Farcaster activity",
  openGraph: {
    title: "Insight | Farcaster Analytics",
    description: "Powerful analytics for your Farcaster activity",
    images: ["/og-image.png"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_HOST}/og-image.png`,
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_HOST}/api/frame`,
    "fc:frame:button:1": "Analyze My Activity",
    "fc:frame:button:1:action": "post",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <InsightDashboard />
    </main>
  )
}

