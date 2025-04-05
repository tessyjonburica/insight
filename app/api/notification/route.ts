import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Log the notification request
    console.log("Received notification request:", body)

    // Generate a unique notification ID
    const notificationId = `insight-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`

    // Return the notification details
    return NextResponse.json({
      notificationId,
      targetUrl: `${process.env.NEXT_PUBLIC_HOST}?fid=${body.fid}`,
    })
  } catch (error) {
    console.error("Error processing notification request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

