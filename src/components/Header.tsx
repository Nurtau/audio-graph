import { useAudio } from '../context/AudioContext'
import styles from './Header.module.css'

export function Header() {
  const { state } = useAudio()

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Audio Graph</h1>
        <div className={styles.status}>
          <span
            className={`${styles.indicator} ${state.isRecording ? styles.recording : ''}`}
          />
          <span className={styles.statusText}>
            {state.isRecording ? 'Recording' : 'Ready'}
          </span>
        </div>
      </div>
    </header>
  )
}
