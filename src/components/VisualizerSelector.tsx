import { useAudio } from '../context/AudioContext'
import { VisualizerType } from '../audio/types'
import styles from './VisualizerSelector.module.css'

const visualizers: Array<{ type: VisualizerType; label: string }> = [
  { type: 'waveform', label: 'Waveform' },
  { type: 'spectrum', label: 'Spectrum' },
  { type: 'spectrogram', label: 'Spectrogram' },
  { type: 'circular', label: 'Circular' },
]

export function VisualizerSelector() {
  const { state, setVisualizer } = useAudio()

  return (
    <div className={styles.container}>
      {visualizers.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => setVisualizer(type)}
          className={`${styles.tab} ${state.currentVisualizer === type ? styles.active : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
