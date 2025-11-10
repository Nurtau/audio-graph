import { AudioProvider } from './context/AudioContext'
import { Header } from './components/Header'
import { VisualizerCanvas } from './components/VisualizerCanvas'
import { VisualizerSelector } from './components/VisualizerSelector'
import { RecordButton } from './components/RecordButton'
import { LevelMeter } from './components/LevelMeter'
import { ErrorDisplay } from './components/ErrorDisplay'
import styles from './App.module.css'

function AppContent() {
  return (
    <div className={styles.app}>
      <ErrorDisplay />
      <Header />
      <main className={styles.main}>
        <div className={styles.visualizerContainer}>
          <VisualizerCanvas />
        </div>
        <div className={styles.selectorContainer}>
          <VisualizerSelector />
        </div>
        <div className={styles.controlPanel}>
          <div className={styles.recordSection}>
            <RecordButton />
          </div>
          <div className={styles.meterSection}>
            <LevelMeter />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  )
}
