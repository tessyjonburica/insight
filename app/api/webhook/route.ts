import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Log the webhook event
    console.log("Received webhook event:", body)

    // Handle different webhook events
    switch (body.type) {
      case "frame_added":
        // User added the frame (notifications enabled)
        console.log(`User ${body.fid} added the frame`)
        // Store this information in your database
        break

      case "frame_removed":
        // User removed the frame (notifications invalidated)
        console.log(`User ${body.fid} removed the frame`)
        // Remove notification permissions from your database
        break

      case "notifications_enabled":
        // User enabled notifications
        console.log(`User ${body.fid} enabled notifications`)
        // Update notification preferences in your database
        break

      case "notifications_disabled":
        // User disabled notifications
        console.log(`User ${body.fid} disabled notifications`)
        // Update notification preferences in your database
        break

      default:
        console.log(`Unknown webhook event type: ${body.type}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}