import { useState, useCallback } from 'react'
import { useAudio } from '../context/AudioContext'
import { useAnimationFrame } from '../hooks/useAnimationFrame'
import styles from './LevelMeter.module.css'

export function LevelMeter() {
  const { state, analyzer } = useAudio()
  const [level, setLevel] = useState(0)
  const [peak, setPeak] = useState(0)

  const updateLevel = useCallback(() => {
    if (!state.isRecording) {
      setLevel(0)
      setPeak(0)
      return
    }

    const audioData = analyzer.getAudioData()
    if (audioData) {
      setLevel(audioData.rms)
      setPeak(audioData.peak)
    }
  }, [state.isRecording, analyzer])

  useAnimationFrame(updateLevel, state.isRecording)

  const levelPercent = Math.min(level * 100, 100)
  const peakPercent = Math.min(peak * 100, 100)

  const getColor = (percent: number) => {
    if (percent < 60) return 'var(--success)'
    if (percent < 85) return 'var(--warning)'
    return 'var(--error)'
  }

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <span>Level</span>
        <span className={styles.value}>
          {levelPercent.toFixed(0)}%
        </span>
      </div>
      <div className={styles.meterContainer}>
        <div className={styles.meterTrack}>
          <div
            className={styles.meterBar}
            style={{
              width: `${levelPercent}%`,
              background: getColor(levelPercent),
              boxShadow: `0 0 10px ${getColor(levelPercent)}`,
            }}
          />
          {peakPercent > 0 && (
            <div
              className={styles.peakIndicator}
              style={{
                left: `${peakPercent}%`,
                background: getColor(peakPercent),
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
