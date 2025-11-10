import { AudioData } from '../audio/types'
import { BaseVisualizer } from './BaseVisualizer'

export class SpectrogramVisualizer extends BaseVisualizer {
  private historyCanvas: HTMLCanvasElement
  private historyCtx: CanvasRenderingContext2D
  private frequencyBins: number = 128

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)

    // Create offscreen canvas for history
    this.historyCanvas = document.createElement('canvas')
    const ctx = this.historyCanvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to create history context')
    }
    this.historyCtx = ctx

    // Initialize with default dimensions
    this.historyCanvas.width = canvas.width || 800
    this.historyCanvas.height = canvas.height || 600
  }

  resize(width: number, height: number): void {
    super.resize(width, height)

    // Only resize if dimensions are valid
    if (width > 0 && height > 0) {
      // Save current content
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = this.historyCanvas.width
      tempCanvas.height = this.historyCanvas.height
      const tempCtx = tempCanvas.getContext('2d')
      if (tempCtx) {
        tempCtx.drawImage(this.historyCanvas, 0, 0)
      }

      // Resize history canvas
      this.historyCanvas.width = width
      this.historyCanvas.height = height

      // Restore content (scaled)
      if (tempCtx) {
        this.historyCtx.drawImage(tempCanvas, 0, 0, width, height)
      }

      // Use a reasonable number of frequency bins (max 256)
      this.frequencyBins = Math.min(height, 256)
    }
  }

  render(audioData: AudioData): void {
    const { frequencyData } = audioData

    // Skip rendering if dimensions are invalid
    if (this.width <= 0 || this.height <= 0) {
      return
    }

    // Create a temporary canvas for the shift operation
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = this.historyCanvas.width
    tempCanvas.height = this.historyCanvas.height
    const tempCtx = tempCanvas.getContext('2d')

    if (!tempCtx) return

    // Copy current history to temp canvas
    tempCtx.drawImage(this.historyCanvas, 0, 0)

    // Clear history canvas
    this.historyCtx.clearRect(0, 0, this.width, this.height)

    // Draw shifted content (scroll left by 1 pixel)
    this.historyCtx.drawImage(tempCanvas, -1, 0)

    // Draw new column on the right
    const step = frequencyData.length / this.frequencyBins
    const pixelHeight = this.height / this.frequencyBins

    for (let i = 0; i < this.frequencyBins; i++) {
      const dataIndex = Math.floor(i * step)
      const value = frequencyData[dataIndex]

      // Map value to color (from black to bright colors)
      const intensity = value / 255
      let r, g, b

      if (intensity < 0.5) {
        // Black to blue
        r = 0
        g = 0
        b = Math.floor(intensity * 2 * 255)
      } else {
        // Blue to yellow/white
        const t = (intensity - 0.5) * 2
        r = Math.floor(t * 255)
        g = Math.floor(t * 200)
        b = 255
      }

      this.historyCtx.fillStyle = `rgb(${r}, ${g}, ${b})`
      this.historyCtx.fillRect(
        this.width - 2,
        this.height - (i + 1) * pixelHeight,
        2,
        Math.ceil(pixelHeight)
      )
    }

    // Draw to main canvas
    this.ctx.fillStyle = '#0a0a0f'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.drawImage(this.historyCanvas, 0, 0)
  }

  cleanup(): void {
    super.cleanup()
    this.historyCtx.clearRect(
      0,
      0,
      this.historyCanvas.width,
      this.historyCanvas.height
    )
  }
}
