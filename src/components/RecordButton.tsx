import { useAudio } from '../context/AudioContext'
import styles from './RecordButton.module.css'

export function RecordButton() {
  const { state, startRecording, stopRecording } = useAudio()

  const handleClick = () => {
    if (state.isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${state.isRecording ? styles.recording : ''}`}
      aria-label={state.isRecording ? 'Stop recording' : 'Start recording'}
    >
      {state.isRecording ? (
        <svg
          className={styles.icon}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
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
      )}
    </button>
  )
}
