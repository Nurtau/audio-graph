import { AudioData } from '../audio/types'
import { BaseVisualizer } from './BaseVisualizer'

export class WaveformVisualizer extends BaseVisualizer {
  private showGrid: boolean = true

  render(audioData: AudioData): void {
    const { timeDomainData } = audioData

    // Clear canvas
    this.ctx.fillStyle = '#0a0a0f'
    this.ctx.fillRect(0, 0, this.width, this.height)

    // Draw grid
    if (this.showGrid) {
      this.drawGrid()
    }

    // Draw center line
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.height / 2)
    this.ctx.lineTo(this.width, this.height / 2)
    this.ctx.stroke()

    // Draw waveform
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = '#10b981'
    this.ctx.beginPath()

    const sliceWidth = this.width / timeDomainData.length
    let x = 0

    for (let i = 0; i < timeDomainData.length; i++) {
      const v = timeDomainData[i] / 128.0
      const y = (v * this.height) / 2

      if (i === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }

      x += sliceWidth
    }

    this.ctx.stroke()

    // Add glow effect
    this.ctx.shadowBlur = 10
    this.ctx.shadowColor = '#10b981'
    this.ctx.stroke()
    this.ctx.shadowBlur = 0
  }

  setShowGrid(show: boolean): void {
    this.showGrid = show
  }
}
