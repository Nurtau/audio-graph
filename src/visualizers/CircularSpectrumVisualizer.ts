import { AudioData } from '../audio/types'
import { BaseVisualizer } from './BaseVisualizer'

export class CircularSpectrumVisualizer extends BaseVisualizer {
  private barCount: number = 128
  private rotation: number = 0

  render(audioData: AudioData): void {
    const { frequencyData } = audioData

    // Clear canvas
    this.ctx.fillStyle = '#0a0a0f'
    this.ctx.fillRect(0, 0, this.width, this.height)

    const centerX = this.width / 2
    const centerY = this.height / 2
    const radius = Math.min(this.width, this.height) * 0.25
    const maxBarLength = Math.min(this.width, this.height) * 0.3

    // Update rotation
    this.rotation += 0.001

    const step = Math.floor(frequencyData.length / this.barCount)

    for (let i = 0; i < this.barCount; i++) {
      const dataIndex = i * step
      const value = frequencyData[dataIndex]
      const barHeight = (value / 255) * maxBarLength

      // Calculate angle
      const angle =
        (i / this.barCount) * Math.PI * 2 + this.rotation

      // Start point on circle
      const x1 = centerX + Math.cos(angle) * radius
      const y1 = centerY + Math.sin(angle) * radius

      // End point (outward)
      const x2 = centerX + Math.cos(angle) * (radius + barHeight)
      const y2 = centerY + Math.sin(angle) * (radius + barHeight)

      // Create gradient
      const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2)
      const hue = (i / this.barCount) * 360
      gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.5)`)
      gradient.addColorStop(1, `hsla(${hue}, 90%, 60%, 1)`)

      // Draw line
      this.ctx.strokeStyle = gradient
      this.ctx.lineWidth = Math.max(2, (Math.PI * 2 * radius) / this.barCount)
      this.ctx.lineCap = 'round'
      this.ctx.beginPath()
      this.ctx.moveTo(x1, y1)
      this.ctx.lineTo(x2, y2)
      this.ctx.stroke()
    }

    // Draw center circle
    const avgFreq =
      frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length
    const centerRadius = radius * 0.3 + (avgFreq / 255) * radius * 0.2

    const centerGradient = this.ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      centerRadius
    )
    centerGradient.addColorStop(0, '#6366f1')
    centerGradient.addColorStop(1, '#8b5cf6')

    this.ctx.fillStyle = centerGradient
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2)
    this.ctx.fill()

    // Add glow
    this.ctx.shadowBlur = 20
    this.ctx.shadowColor = '#6366f1'
    this.ctx.fill()
    this.ctx.shadowBlur = 0
  }

  setBarCount(count: number): void {
    this.barCount = Math.max(32, Math.min(256, count))
  }
}
