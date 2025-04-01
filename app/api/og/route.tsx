import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const fid = searchParams.get("fid") || "unknown"
  const username = searchParams.get("username") || "farcaster_user"
  const casts = Number.parseInt(searchParams.get("casts") || "0")
  const replies = Number.parseInt(searchParams.get("replies") || "0")
  const likes = Number.parseInt(searchParams.get("likes") || "0")
  const engagement = Number.parseInt(searchParams.get("engagement") || "0")
  const influence = Number.parseInt(searchParams.get("influence") || "0")

  // Font
  const interBold = fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2",
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer())

  const interRegular = fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
      import.meta.url,
    ),
  ).then((res) => res.arrayBuffer())

  const [interBoldData, interRegularData] = await Promise.all([interBold, interRegular])

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #0a0a1f, #0f172a)",
        padding: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.3)",
          borderRadius: 20,
          padding: 40,
          width: "90%",
          border: "1px solid rgba(20, 184, 166, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(to right, #14b8a6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 15,
            }}
          >
            ✨
          </div>
          <h1
            style={{
              fontSize: 50,
              fontWeight: "bold",
              color: "white",
              background: "linear-gradient(to right, #14b8a6, #06b6d4)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Insight
          </h1>
        </div>

        <p
          style={{
            color: "#94a3b8",
            fontSize: 24,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          @{username}'s Farcaster Analytics
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: 20,
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(20, 184, 166, 0.2)",
              borderRadius: 15,
              padding: 20,
            }}
          >
            <p style={{ color: "#94a3b8", fontSize: 20, marginBottom: 5 }}>Casts</p>
            <p style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>{casts}</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(6, 182, 212, 0.2)",
              borderRadius: 15,
              padding: 20,
            }}
          >
            <p style={{ color: "#94a3b8", fontSize: 20, marginBottom: 5 }}>Replies</p>
            <p style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>{replies}</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(16, 185, 129, 0.2)",
              borderRadius: 15,
              padding: 20,
            }}
          >
            <p style={{ color: "#94a3b8", fontSize: 20, marginBottom: 5 }}>Likes</p>
            <p style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>{likes}</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            marginTop: 40,
            gap: 15,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "white", fontSize: 20 }}>Engagement Score</p>
            <div
              style={{
                width: 300,
                height: 20,
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${engagement}%`,
                  height: "100%",
                  background: engagement > 70 ? "#14b8a6" : engagement > 40 ? "#f59e0b" : "#ef4444",
                  borderRadius: 10,
                }}
              />
            </div>
            <p style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{engagement}%</p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "white", fontSize: 20 }}>Influence Rate</p>
            <div
              style={{
                width: 300,
                height: 20,
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${influence}%`,
                  height: "100%",
                  background: influence > 70 ? "#14b8a6" : influence > 40 ? "#f59e0b" : "#ef4444",
                  borderRadius: 10,
                }}
              />
            </div>
            <p style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{influence}%</p>
          </div>
        </div>

        <p
          style={{
            color: "#94a3b8",
            fontSize: 18,
            marginTop: 40,
            textAlign: "center",
          }}
        >
          Generated by Insight • Farcaster Analytics
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interBoldData,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: interRegularData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  )
}

