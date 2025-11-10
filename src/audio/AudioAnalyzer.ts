import { AudioData, AudioSettings } from './types'

export class AudioAnalyzer {
  private audioContext: AudioContext | null = null
  private analyserNode: AnalyserNode | null = null
  private sourceNode: MediaStreamAudioSourceNode | null = null
  private frequencyData: Uint8Array | null = null
  private timeDomainData: Uint8Array | null = null

  init(stream: MediaStream, settings: AudioSettings): void {
    // Clean up existing context
    this.cleanup()

    // Create audio context
    this.audioContext = new AudioContext()

    // Create analyser node
    this.analyserNode = this.audioContext.createAnalyser()
    this.analyserNode.fftSize = settings.fftSize
    this.analyserNode.smoothingTimeConstant = settings.smoothingTimeConstant
    this.analyserNode.minDecibels = settings.minDecibels
    this.analyserNode.maxDecibels = settings.maxDecibels

    // Create source from stream
    this.sourceNode = this.audioContext.createMediaStreamSource(stream)
    this.sourceNode.connect(this.analyserNode)

    // Initialize data arrays
    this.frequencyData = new Uint8Array(
      this.analyserNode.frequencyBinCount
    )
    this.timeDomainData = new Uint8Array(
      this.analyserNode.frequencyBinCount
    )
  }

  getAudioData(): AudioData | null {
    if (!this.analyserNode || !this.frequencyData || !this.timeDomainData) {
      return null
    }

    // Get frequency data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.analyserNode.getByteFrequencyData(this.frequencyData as any)

    // Get time domain data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.analyserNode.getByteTimeDomainData(this.timeDomainData as any)

    // Calculate RMS (Root Mean Square)
    const rms = this.calculateRMS(this.timeDomainData)

    // Calculate peak
    const peak = this.calculatePeak(this.timeDomainData)

    return {
      frequencyData: this.frequencyData.slice(),
      timeDomainData: this.timeDomainData.slice(),
      rms,
      peak,
      timestamp: Date.now(),
    }
  }

  private calculateRMS(data: Uint8Array): number {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      const normalized = (data[i] - 128) / 128
      sum += normalized * normalized
    }
    return Math.sqrt(sum / data.length)
  }

  private calculatePeak(data: Uint8Array): number {
    let peak = 0
    for (let i = 0; i < data.length; i++) {
      const normalized = Math.abs((data[i] - 128) / 128)
      if (normalized > peak) {
        peak = normalized
      }
    }
    return peak
  }

  updateSettings(settings: Partial<AudioSettings>): void {
    if (!this.analyserNode) return

    if (settings.fftSize !== undefined) {
      this.analyserNode.fftSize = settings.fftSize
      // Recreate data arrays with new size
      this.frequencyData = new Uint8Array(
        this.analyserNode.frequencyBinCount
      )
      this.timeDomainData = new Uint8Array(
        this.analyserNode.frequencyBinCount
      )
    }

    if (settings.smoothingTimeConstant !== undefined) {
      this.analyserNode.smoothingTimeConstant = settings.smoothingTimeConstant
    }

    if (settings.minDecibels !== undefined) {
      this.analyserNode.minDecibels = settings.minDecibels
    }

    if (settings.maxDecibels !== undefined) {
      this.analyserNode.maxDecibels = settings.maxDecibels
    }
  }

  cleanup(): void {
    if (this.sourceNode) {
      this.sourceNode.disconnect()
      this.sourceNode = null
    }

    if (this.analyserNode) {
      this.analyserNode.disconnect()
      this.analyserNode = null
    }

    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }

    this.frequencyData = null
    this.timeDomainData = null
  }

  getAnalyserNode(): AnalyserNode | null {
    return this.analyserNode
  }

  getAudioContext(): AudioContext | null {
    return this.audioContext
  }
}
