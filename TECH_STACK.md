# Technology Stack

## Frontend Framework

### React 18+
**Why React?**
- Component-based architecture ideal for modular visualizers
- Excellent mobile support
- Large ecosystem and community
- Hooks API perfect for audio context management
- Fast virtual DOM for UI updates

**Key Features Used**:
- `useState`, `useEffect`, `useRef` for audio management
- `useContext` for global audio state
- `useMemo`, `useCallback` for performance
- Custom hooks for reusable audio logic

## Build Tool

### Vite
**Why Vite?**
- Lightning-fast HMR for development
- Optimized production builds
- Native ES modules support
- Excellent TypeScript support
- Simple configuration

**Configuration**:
```javascript
{
  plugins: [react()],
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: true
  }
}
```

## Language

### TypeScript
**Why TypeScript?**
- Type safety for complex audio processing
- Better IDE support and autocomplete
- Catch errors at compile time
- Self-documenting code
- Easier refactoring

**Key Types**:
```typescript
interface AudioData {
  frequencyData: Uint8Array;
  timeDomainData: Uint8Array;
  rms: number;
  peak: number;
  timestamp: number;
}

interface VisualizerConfig {
  fftSize: number;
  smoothingTimeConstant: number;
  minDecibels: number;
  maxDecibels: number;
}
```

## Audio Processing

### Web Audio API
**Native Browser API**

**Key Components**:
- `AudioContext`: Main audio processing graph
- `MediaStreamAudioSourceNode`: Microphone input
- `AnalyserNode`: FFT and time-domain analysis
- `GainNode`: Volume control (optional)

**Advantages**:
- Native performance (C++ implementation)
- Real-time processing capability
- No external dependencies
- Cross-browser support

## Visualization

### HTML5 Canvas API
**Why Canvas?**
- High-performance 2D rendering
- Direct pixel manipulation
- 60fps animation capability
- Low overhead compared to SVG/DOM
- Mobile-optimized

**Rendering Strategy**:
```javascript
// Double buffering approach
const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');

// Draw to offscreen canvas
drawVisualization(offscreenCtx, audioData);

// Copy to visible canvas
ctx.drawImage(offscreenCanvas, 0, 0);
```

### Optional: WebGL (Phase 2)
For advanced visualizations:
- 3D spectrum visualizations
- Particle effects
- GPU-accelerated rendering

## Styling

### CSS Modules + PostCSS
**Why CSS Modules?**
- Scoped styles prevent conflicts
- Co-locate styles with components
- Type-safe with TypeScript
- No runtime overhead

**PostCSS Plugins**:
- `autoprefixer`: Browser compatibility
- `postcss-preset-env`: Modern CSS features
- `cssnano`: Minification

### Tailwind CSS (Optional Alternative)
For rapid mobile-first development:
- Utility-first approach
- Responsive design utilities
- Dark mode support built-in
- Small production bundle with purging

## State Management

### React Context API + useReducer
**Why Context over Redux?**
- Simpler for this use case
- No external dependency
- Built-in to React
- Sufficient for app-level audio state

**State Structure**:
```typescript
interface AudioState {
  isRecording: boolean;
  isInitialized: boolean;
  error: string | null;
  currentVisualizer: VisualizerType;
  settings: AudioSettings;
  deviceInfo: MediaDeviceInfo | null;
}
```

## UI Component Library (Optional)

### Headless UI or Radix UI
**Why Headless?**
- Full styling control for dark theme
- Accessible by default
- Mobile-friendly
- Small bundle size

**Components Needed**:
- Switch/Toggle for controls
- Slider for settings
- Dropdown for visualizer selection
- Modal for settings/errors

## Development Tools

### ESLint + Prettier
- Code quality and consistency
- React best practices
- TypeScript-specific rules
- Auto-formatting

### Vitest
- Fast unit testing
- Vite-native integration
- React Testing Library support
- Coverage reporting

### Playwright (E2E)
- Cross-browser testing
- Mobile device emulation
- Audio permission testing
- Visual regression testing

## Package Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.2.0",
  "typescript": "^5.3.0",
  "vite": "^5.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "eslint": "^8.56.0",
  "prettier": "^3.1.0",
  "vitest": "^1.0.0",
  "@testing-library/react": "^14.1.0"
}
```

## Performance Monitoring

### Web Vitals
- Track Core Web Vitals
- Monitor FPS
- Measure audio processing latency
- Bundle size analysis

### Chrome DevTools Performance API
```javascript
performance.mark('audio-process-start');
// ... process audio ...
performance.mark('audio-process-end');
performance.measure('audio-processing', 'audio-process-start', 'audio-process-end');
```

## Deployment

### Vercel / Netlify
**Why Static Hosting?**
- No server-side processing needed
- CDN distribution
- Automatic HTTPS
- Preview deployments
- Edge network for low latency

### GitHub Actions CI/CD
```yaml
- Build and test on push
- Run linting and type checking
- Generate production bundle
- Deploy to hosting platform
```

## Browser Targets

### Production Build Targets
```javascript
{
  "browserslist": [
    "chrome >= 85",
    "firefox >= 88",
    "safari >= 14.1",
    "edge >= 85",
    "ios >= 14.5",
    "android >= 85"
  ]
}
```

## Progressive Web App (PWA) - Phase 2

### Workbox
- Service worker generation
- Offline capability
- App-like experience on mobile
- Install prompt

### Manifest.json
- App icons
- Theme color
- Display mode
- Orientation lock
