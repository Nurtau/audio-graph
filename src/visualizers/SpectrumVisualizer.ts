import { AudioData } from '../audio/types'
import { BaseVisualizer } from './BaseVisualizer'

export class SpectrumVisualizer extends BaseVisualizer {
  private barCount: number = 64
  private showGrid: boolean = false

  render(audioData: AudioData): void {
    const { frequencyData } = audioData

    // Clear canvas
    this.ctx.fillStyle = '#0a0a0f'
    this.ctx.fillRect(0, 0, this.width, this.height)

    // Draw grid
    if (this.showGrid) {
      this.drawGrid()
    }

    const barWidth = this.width / this.barCount
    const barSpacing = barWidth * 0.1
    const actualBarWidth = barWidth - barSpacing

    // Sample frequency data
    const step = Math.floor(frequencyData.length / this.barCount)

    for (let i = 0; i < this.barCount; i++) {
      const dataIndex = i * step
      const value = frequencyData[dataIndex]
      const barHeight = (value / 255) * this.height
      const x = i * barWidth

      // Create gradient based on height (frequency-based coloring)
      const hue = (i / this.barCount) * 120 + 220 // Blue to purple range
      const saturation = 70 + (value / 255) * 30
      const lightness = 40 + (value / 255) * 20

      this.ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`

      // Draw bar from bottom
      this.ctx.fillRect(
        x,
        this.height - barHeight,
        actualBarWidth,
        barHeight
      )

      // Add glow on higher values
      if (value > 200) {
        this.ctx.shadowBlur = 15
        this.ctx.shadowColor = this.ctx.fillStyle
        this.ctx.fillRect(
          x,
          this.height - barHeight,
          actualBarWidth,
          barHeight
        )
        this.ctx.shadowBlur = 0
      }
    }
  }

  setBarCount(count: number): void {
    this.barCount = Math.max(16, Math.min(256, count))
  }

  setShowGrid(show: boolean): void {
    this.showGrid = show
  }
}
