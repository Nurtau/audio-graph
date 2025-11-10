import { AudioData } from '../audio/types'

export abstract class BaseVisualizer {
  protected canvas: HTMLCanvasElement
  protected ctx: CanvasRenderingContext2D
  protected width: number = 0
  protected height: number = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get 2D context')
    }
    this.ctx = ctx
    // Don't resize in constructor - let the component handle initial sizing
  }

  resize(width: number, height: number): void {
    this.width = width
    this.height = height
    this.canvas.width = width
    this.canvas.height = height
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  abstract render(audioData: AudioData): void

  cleanup(): void {
    this.clear()
  }

  protected drawGrid(gridColor: string = 'rgba(255, 255, 255, 0.05)'): void {
    this.ctx.strokeStyle = gridColor
    this.ctx.lineWidth = 1

    // Vertical lines
    const vSpacing = this.width / 10
    for (let i = 1; i < 10; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(i * vSpacing, 0)
      this.ctx.lineTo(i * vSpacing, this.height)
      this.ctx.stroke()
    }

    // Horizontal lines
    const hSpacing = this.height / 10
    for (let i = 1; i < 10; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, i * hSpacing)
      this.ctx.lineTo(this.width, i * hSpacing)
      this.ctx.stroke()
    }
  }
}
