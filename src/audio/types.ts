export interface AudioData {
  frequencyData: Uint8Array
  timeDomainData: Uint8Array
  rms: number
  peak: number
  timestamp: number
}

export interface AudioSettings {
  fftSize: number
  smoothingTimeConstant: number
  minDecibels: number
  maxDecibels: number
}

export type VisualizerType =
  | 'waveform'
  | 'spectrum'
  | 'spectrogram'
  | 'levelmeter'
  | 'circular'

export interface VisualizerConfig {
  type: VisualizerType
  width: number
  height: number
  colorPrimary: string
  colorSecondary: string
}
