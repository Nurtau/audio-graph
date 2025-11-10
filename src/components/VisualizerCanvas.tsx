import { useEffect, useRef, useCallback } from 'react'
import { useAudio } from '../context/AudioContext'
import { useAnimationFrame } from '../hooks/useAnimationFrame'
import { WaveformVisualizer } from '../visualizers/WaveformVisualizer'
import { SpectrumVisualizer } from '../visualizers/SpectrumVisualizer'
import { SpectrogramVisualizer } from '../visualizers/SpectrogramVisualizer'
import { CircularSpectrumVisualizer } from '../visualizers/CircularSpectrumVisualizer'
import { BaseVisualizer } from '../visualizers/BaseVisualizer'
import styles from './VisualizerCanvas.module.css'

export function VisualizerCanvas() {
  const { state, analyzer } = useAudio()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const visualizerRef = useRef<BaseVisualizer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize visualizer when type changes
  useEffect(() => {
    if (!canvasRef.current) return

    // Cleanup old visualizer
    if (visualizerRef.current) {
      visualizerRef.current.cleanup()
    }

    // Create new visualizer
    switch (state.currentVisualizer) {
      case 'waveform':
        visualizerRef.current = new WaveformVisualizer(canvasRef.current)
        break
      case 'spectrum':
        visualizerRef.current = new SpectrumVisualizer(canvasRef.current)
        break
      case 'spectrogram':
        visualizerRef.current = new SpectrogramVisualizer(canvasRef.current)
        break
      case 'circular':
        visualizerRef.current = new CircularSpectrumVisualizer(
          canvasRef.current
        )
        break
    }

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && visualizerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        visualizerRef.current.resize(width, height)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (visualizerRef.current) {
        visualizerRef.current.cleanup()
      }
    }
  }, [state.currentVisualizer])

  // Animation loop
  const renderFrame = useCallback(() => {
    if (!state.isRecording || !visualizerRef.current) return

    const audioData = analyzer.getAudioData()
    if (audioData) {
      visualizerRef.current.render(audioData)
    }
  }, [state.isRecording, analyzer])

  useAnimationFrame(renderFrame, state.isRecording)

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      {!state.isRecording && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            <p className={styles.overlayText}>
              Click the microphone button to start
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
