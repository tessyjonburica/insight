// This is a simplified version of the Frame SDK for client-side usage
// In a production app, you would use the actual @farcaster/frame-sdk package

export type FrameSDK = {
  actions: {
    ready: () => void
    notificationsEnabled: () => void
    notificationsDisabled: () => void
    frameAdded: () => void
    frameRemoved: () => void
  }
}

export function initFrameSDK(): FrameSDK {
  // This is a simplified implementation
  const sdk: FrameSDK = {
    actions: {
      ready: () => {
        console.log("Frame is ready")
        // In a real implementation, this would signal to Warpcast that the frame is ready
      },
      notificationsEnabled: () => {
        console.log("Notifications enabled")
      },
      notificationsDisabled: () => {
        console.log("Notifications disabled")
      },
      frameAdded: () => {
        console.log("Frame added")
      },
      frameRemoved: () => {
        console.log("Frame removed")
      },
    },
  }

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.frameSDK = sdk
  }

  return sdk
}

