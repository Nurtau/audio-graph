import { AudioData } from '../audio/types'
import { BaseVisualizer } from './BaseVisualizer'

export class SpectrogramVisualizer extends BaseVisualizer {
  private imageData: ImageData | null = null
  private frequencyBins: number = 128

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
  }

  resize(width: number, height: number): void {
    super.resize(width, height)

    // Only resize if dimensions are valid
    if (width > 0 && height > 0) {
      // Create new image data with proper dimensions
      this.imageData = this.ctx.createImageData(width, height)

      // Use a reasonable number of frequency bins (max 256)
      this.frequencyBins = Math.min(height, 256)
    }
  }

  render(audioData: AudioData): void {
    const { frequencyData } = audioData

    // Skip rendering if dimensions are invalid or imageData not ready
    if (this.width <= 0 || this.height <= 0 || !this.imageData) {
      return
    }

    // Shift the image data left by 1 pixel
    const data = this.imageData.data
    const width = this.width
    const height = this.height

    // Shift pixels to the left
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width - 1; x++) {
        const srcIndex = (y * width + x + 1) * 4
        const dstIndex = (y * width + x) * 4
        data[dstIndex] = data[srcIndex]         // R
        data[dstIndex + 1] = data[srcIndex + 1] // G
        data[dstIndex + 2] = data[srcIndex + 2] // B
        data[dstIndex + 3] = data[srcIndex + 3] // A
      }
    }

    // Draw new column on the right
    const step = frequencyData.length / this.frequencyBins
    const pixelHeight = height / this.frequencyBins

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

      // Draw multiple pixels vertically for this frequency bin
      const startY = Math.floor(height - (i + 1) * pixelHeight)
      const endY = Math.ceil(height - i * pixelHeight)

      for (let y = startY; y < endY && y < height; y++) {
        if (y >= 0) {
          const pixelIndex = (y * width + (width - 1)) * 4
          data[pixelIndex] = r
          data[pixelIndex + 1] = g
          data[pixelIndex + 2] = b
          data[pixelIndex + 3] = 255 // Alpha
        }
      }
    }

    // Draw to canvas
    this.ctx.fillStyle = '#0a0a0f'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.putImageData(this.imageData, 0, 0)
  }

  cleanup(): void {
    super.cleanup()
    this.imageData = null
  }
}
