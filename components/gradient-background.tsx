"use client"

import { useEffect, useRef } from "react"

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient orbs
    class GradientOrb {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 300 + 100

        // Colors: teal, cyan, emerald
        const colors = [
          "rgba(20, 184, 166, 0.15)", // teal-500
          "rgba(6, 182, 212, 0.15)", // cyan-500
          "rgba(16, 185, 129, 0.15)", // emerald-500
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]

        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < -this.radius) this.x = canvas.width + this.radius
        if (this.x > canvas.width + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = canvas.height + this.radius
        if (this.y > canvas.height + this.radius) this.y = -this.radius
      }

      draw() {
        if (!ctx) return

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)

        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create orbs
    const orbs: GradientOrb[] = []
    const numberOfOrbs = 6

    for (let i = 0; i < numberOfOrbs; i++) {
      orbs.push(new GradientOrb())
    }

    // Add subtle noise texture
    const createNoiseTexture = () => {
      const noiseCanvas = document.createElement("canvas")
      noiseCanvas.width = canvas.width
      noiseCanvas.height = canvas.height

      const noiseCtx = noiseCanvas.getContext("2d")
      if (!noiseCtx) return null

      const imageData = noiseCtx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 20
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 10 // Very subtle opacity
      }

      noiseCtx.putImageData(imageData, 0, 0)
      return noiseCanvas
    }

    const noiseTexture = createNoiseTexture()

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, "#0a0a1f")
      bgGradient.addColorStop(1, "#0f172a")

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw orbs
      for (let i = 0; i < orbs.length; i++) {
        orbs[i].update()
        orbs[i].draw()
      }

      // Apply noise texture
      if (noiseTexture) {
        ctx.globalCompositeOperation = "overlay"
        ctx.drawImage(noiseTexture, 0, 0)
        ctx.globalCompositeOperation = "source-over"
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

