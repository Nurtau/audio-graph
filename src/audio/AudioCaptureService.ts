export class AudioCaptureService {
  private stream: MediaStream | null = null
  private currentDeviceId: string | null = null

  async requestPermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // Close the test stream immediately
      stream.getTracks().forEach((track) => track.stop())
      return true
    } catch (error) {
      console.error('Microphone permission denied:', error)
      return false
    }
  }

  async startCapture(deviceId?: string): Promise<MediaStream> {
    // Stop existing stream if any
    this.stopCapture()

    const constraints: MediaStreamConstraints = {
      audio: deviceId
        ? { deviceId: { exact: deviceId } }
        : {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.currentDeviceId = deviceId || null
      return this.stream
    } catch (error) {
      console.error('Failed to start audio capture:', error)
      throw new Error(
        'Failed to access microphone. Please check permissions.'
      )
    }
  }

  stopCapture(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
      this.stream = null
      this.currentDeviceId = null
    }
  }

  async getDevices(): Promise<MediaDeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      return devices.filter((device) => device.kind === 'audioinput')
    } catch (error) {
      console.error('Failed to enumerate devices:', error)
      return []
    }
  }

  getCurrentDeviceId(): string | null {
    return this.currentDeviceId
  }

  isCapturing(): boolean {
    return this.stream !== null && this.stream.active
  }

  static isSupported(): boolean {
    return !!(
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    )
  }
}
