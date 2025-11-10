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
  }

  resize(width: number, height: number): void {
    super.resize(width, height)
    this.historyCanvas.width = width
    this.historyCanvas.height = height
    this.frequencyBins = height
  }

  render(audioData: AudioData): void {
    const { frequencyData } = audioData

    // Scroll history to the left
    this.historyCtx.drawImage(this.historyCanvas, -1, 0)

    // Draw new column on the right
    const step = frequencyData.length / this.frequencyBins

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
        this.width - 1,
        this.height - i - 1,
        1,
        1
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
