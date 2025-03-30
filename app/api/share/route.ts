import { type NextRequest, NextResponse } from "next/server"
import { fetchUserData } from "@/lib/farcaster-hub"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const fid = searchParams.get("fid")

    if (!fid) {
      return NextResponse.json({ error: "Missing FID parameter" }, { status: 400 })
    }

    // Fetch user data
    const userData = await fetchUserData(fid)

    if (!userData) {
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
    }

    // Create share text
    const shareText = `📊 My Farcaster Analytics via Insight:
    
🔷 Activity: ${userData.stats.casts} casts, ${userData.stats.replies} replies
❤️ Received ${userData.stats.likesReceived} likes
📈 Engagement Score: ${userData.performance.engagementScore}%
🌟 Influence Rate: ${userData.performance.influenceRate}%

Check your own stats: ${process.env.NEXT_PUBLIC_HOST}`

    // Return the share text
    return NextResponse.json({ text: shareText })
  } catch (error) {
    console.error("Error generating share text:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

