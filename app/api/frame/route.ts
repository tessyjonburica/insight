import { NextRequest, NextResponse } from "next/server"
import { getFrameMessage, FrameRequest } from "@farcaster/frame-node"
import { fetchUserData } from "@/lib/farcaster-hub"

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json()
    
    // Validate the frame message
    const { isValid, message } = await getFrameMessage(body as FrameRequest)
    
    if (!isValid || !message) {
      return NextResponse.json(
        { error: "Invalid frame request" },
        { status: 400 }
      )
    }
    
    // Get user information from the message
    const { fid, buttonIndex } = message
    
    // Fetch real user data from Farcaster Hub
    const userData = await fetchUserData(fid.toString())
    
    if (!userData) {
      return NextResponse.json(
        { error: "Failed to fetch user data" },
        { status: 500 }
      )
    }
    
    // Extract data for OG image
    const { username, stats, performance } = userData
    
    // Determine which button was clicked
    if (buttonIndex === 2) {
      // Share as Cast button was clicked
      return NextResponse.json({
        frame: {
          version: "1",
          image: `${process.env.NEXT_PUBLIC_HOST}/api/og?fid=${fid}&username=${username}&casts=${stats.casts}&replies=${stats.replies}&likes=${stats.likesReceived}&engagement=${performance.engagementScore}&influence=${performance.influenceRate}`,
          buttons: [
            {
              label: "View My Analytics",
              action: "post"
            }
          ],
          title: `${userData.displayName}'s Farcaster Analytics`,
          description: `Engagement: ${performance.engagementScore}% | Influence: ${performance.influenceRate}%`,
          postUrl: `${process.env.NEXT_PUBLIC_HOST}/api/share?fid=${fid}`,
          notificationUrl: `${process.env.NEXT_PUBLIC_HOST}/api/notification`
        }
      })
    }
    
    // Default response (Analyze button was clicked)
    return NextResponse.json({
      frame: {
        version: "1",
        image: `${process.env.NEXT_PUBLIC_HOST}/api/og?fid=${fid}&username=${username}&casts=${stats.casts}&replies=${stats.replies}&likes=${stats.likesReceived}&engagement=${performance.engagementScore}&influence=${performance.influenceRate}`,
        buttons: [
          {
            label: "View Details",
            action: "post"
          },
          {
            label: "Share as Cast",
            action: "post"
          }
        ],
        notificationUrl: `${process.env.NEXT_PUBLIC_HOST}/api/notification`
      }
    })
  } catch (error) {
    console.error("Error processing frame request:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
