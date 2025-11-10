# Quick Start Guide

## Getting Started

### Prerequisites
- Node.js 18+
- Modern browser (Chrome 85+, Firefox 88+, Safari 14.1+)
- Microphone access

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### First Use

1. **Grant Microphone Permission**: Click the large circular microphone button
2. **Allow Access**: Your browser will ask for microphone permission - click "Allow"
3. **See Visualizations**: Audio will immediately start being visualized
4. **Switch Visualizers**: Use the tabs to switch between different visualization modes:
   - **Waveform**: See the time-domain audio signal (oscilloscope style)
   - **Spectrum**: View frequency distribution as colorful bars
   - **Spectrogram**: Watch a scrolling frequency-time heatmap
   - **Circular**: Enjoy an animated radial frequency display

### Features

#### Real-Time Visualizations
- All visualizations update at 60fps
- Smooth animations and transitions
- Responsive to all audio input

#### Level Meter
- Shows real-time audio level (RMS)
- Peak indicator
- Color-coded levels (green/yellow/red)

#### Dark Theme
- Easy on the eyes
- Optimized for extended use
- Mobile-first responsive design

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder. Bundle size:
- JavaScript: 158KB (50KB gzipped)
- CSS: 9KB (2.6KB gzipped)

### Deploy

The built app can be deployed to any static hosting service:
- Vercel: `vercel deploy`
- Netlify: Drag `dist/` folder to Netlify
- GitHub Pages: Push `dist/` to gh-pages branch

### Troubleshooting

**Microphone not working?**
- Check browser permissions (lock icon in address bar)
- Ensure no other app is using the microphone
- Try a different browser

**No audio visualizations?**
- Make sure you're making sound into the microphone
- Check your system microphone settings
- Verify microphone isn't muted

**Performance issues?**
- Close other browser tabs
- Try a different visualizer (Waveform is lightest)
- Check browser console for errors

### Development

**Run linter:**
```bash
npm run lint
```

**Format code:**
```bash
npm run format
```

**Project structure:**
```
src/
├── audio/           # Audio capture and analysis
├── visualizers/     # Canvas visualizers
├── components/      # React UI components
├── context/         # State management
├── hooks/          # Custom React hooks
└── styles/         # CSS styling
```

### Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 85+     | ✅ Full support |
| Firefox | 88+     | ✅ Full support |
| Safari  | 14.1+   | ✅ Full support |
| Edge    | 85+     | ✅ Full support |
| Mobile  | iOS 14.5+, Android Chrome | ✅ Full support |

### Technical Details

**Audio Processing:**
- Web Audio API with AnalyserNode
- FFT size: 2048 samples
- Smoothing: 0.8 time constant
- Sample rate: Device default (usually 48kHz)

**Rendering:**
- Canvas 2D API
- 60fps via requestAnimationFrame
- Responsive canvas sizing
- Hardware-accelerated where available

**State Management:**
- React Context API
- No external state libraries
- Minimal re-renders with React.memo

### Next Steps

Check out the full documentation:
- [Architecture](./ARCHITECTURE.md)
- [Implementation Plan](./IMPLEMENTATION_PLAN.md)
- [Technology Stack](./TECH_STACK.md)
- [UI Design](./UI_DESIGN.md)

Enjoy visualizing your audio! 🎵
