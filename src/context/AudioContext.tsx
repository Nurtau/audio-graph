import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
} from 'react'
import { AudioCaptureService } from '../audio/AudioCaptureService'
import { AudioAnalyzer } from '../audio/AudioAnalyzer'
import { AudioSettings, VisualizerType } from '../audio/types'

interface AudioState {
  isRecording: boolean
  isInitialized: boolean
  error: string | null
  currentVisualizer: VisualizerType
  settings: AudioSettings
}

type AudioAction =
  | { type: 'START_RECORDING' }
  | { type: 'STOP_RECORDING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_VISUALIZER'; payload: VisualizerType }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AudioSettings> }

interface AudioContextType {
  state: AudioState
  captureService: AudioCaptureService
  analyzer: AudioAnalyzer
  startRecording: () => Promise<void>
  stopRecording: () => void
  setVisualizer: (type: VisualizerType) => void
  updateSettings: (settings: Partial<AudioSettings>) => void
  clearError: () => void
}

const initialState: AudioState = {
  isRecording: false,
  isInitialized: false,
  error: null,
  currentVisualizer: 'waveform',
  settings: {
    fftSize: 2048,
    smoothingTimeConstant: 0.8,
    minDecibels: -90,
    maxDecibels: -10,
  },
}

function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case 'START_RECORDING':
      return { ...state, isRecording: true, isInitialized: true, error: null }
    case 'STOP_RECORDING':
      return { ...state, isRecording: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isRecording: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'SET_VISUALIZER':
      return { ...state, currentVisualizer: action.payload }
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      }
    default:
      return state
  }
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState)
  const captureServiceRef = useRef(new AudioCaptureService())
  const analyzerRef = useRef(new AudioAnalyzer())

  const startRecording = useCallback(async () => {
    try {
      // Check browser support
      if (!AudioCaptureService.isSupported()) {
        throw new Error(
          'Your browser does not support audio capture. Please use a modern browser.'
        )
      }

      // Request permission
      const hasPermission =
        await captureServiceRef.current.requestPermission()
      if (!hasPermission) {
        throw new Error(
          'Microphone permission denied. Please allow microphone access.'
        )
      }

      // Start capture
      const stream = await captureServiceRef.current.startCapture()

      // Initialize analyzer
      analyzerRef.current.init(stream, state.settings)

      dispatch({ type: 'START_RECORDING' })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to start recording'
      dispatch({ type: 'SET_ERROR', payload: message })
    }
  }, [state.settings])

  const stopRecording = useCallback(() => {
    captureServiceRef.current.stopCapture()
    analyzerRef.current.cleanup()
    dispatch({ type: 'STOP_RECORDING' })
  }, [])

  const setVisualizer = useCallback((type: VisualizerType) => {
    dispatch({ type: 'SET_VISUALIZER', payload: type })
  }, [])

  const updateSettings = useCallback((settings: Partial<AudioSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings })
    analyzerRef.current.updateSettings(settings)
  }, [])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const value: AudioContextType = {
    state,
    captureService: captureServiceRef.current,
    analyzer: analyzerRef.current,
    startRecording,
    stopRecording,
    setVisualizer,
    updateSettings,
    clearError,
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}
