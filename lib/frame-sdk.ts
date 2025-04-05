// Enhanced Farcaster Frame SDK implementation
export type FrameContext = {
  location: "cast" | "composer" | "channel" | "user"
  castHash?: string
  authorFid?: string
  parentCastHash?: string
  text?: string
  channelKey?: string
  channelName?: string
  userFid?: string
}

export type NotificationDetails = {
  notificationId: string
  targetUrl: string
}

export type FrameSDK = {
  actions: {
    ready: () => void
    viewProfile: (params: { fid: string }) => void
    setPrimaryButton: (params: {
      text: string
      enabled: boolean
      hidden: boolean
    }) => void
  }
  context: {
    location: FrameContext
  }
  events: {
    on: (event: string, callback: (data: any) => void) => void
    off: (event: string, callback: (data: any) => void) => void
    removeAllListeners: () => void
  }
}

export function initFrameSDK(): FrameSDK {
  // This is a simplified implementation for client-side usage
  const sdk: FrameSDK = {
    actions: {
      ready: () => {
        console.log("Frame is ready")
        // In a real implementation, this would signal to Warpcast that the frame is ready
      },
      viewProfile: ({ fid }) => {
        console.log(`View profile for FID: ${fid}`)
        // In a real implementation, this would open a profile modal
      },
      setPrimaryButton: ({ text, enabled, hidden }) => {
        console.log(`Set primary button: ${text}, enabled: ${enabled}, hidden: ${hidden}`)
        // In a real implementation, this would set the primary button
      },
    },
    context: {
      location: {
        location: "cast",
      },
    },
    events: {
      on: (event, callback) => {
        console.log(`Registered event listener for: ${event}`)
        // In a real implementation, this would register an event listener
        window.addEventListener(`farcaster:${event}`, (e: any) => callback(e.detail))
      },
      off: (event, callback) => {
        console.log(`Removed event listener for: ${event}`)
        // In a real implementation, this would remove an event listener
        window.removeEventListener(`farcaster:${event}`, (e: any) => callback(e.detail))
      },
      removeAllListeners: () => {
        console.log("Removed all event listeners")
        // In a real implementation, this would remove all event listeners
      },
    },
  }

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.frameSDK = sdk
  }

  return sdk
}

