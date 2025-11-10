# UI Design Specifications

## Design Philosophy

### Mobile-First Approach
- Design for smallest screens first (320px width)
- Progressive enhancement for tablets and desktop
- Touch-friendly interactions (44x44px minimum tap targets)
- Responsive typography and spacing

### Dark Theme
- Reduced eye strain for extended use
- Better contrast for visualizations
- Modern aesthetic
- Energy efficient on OLED screens

## Color Palette

### Primary Colors
```css
/* Background */
--bg-primary: #0a0a0f;      /* Deep dark blue-black */
--bg-secondary: #151520;     /* Slightly lighter panels */
--bg-tertiary: #1f1f2e;      /* Elevated surfaces */

/* Accent */
--accent-primary: #6366f1;   /* Indigo - primary actions */
--accent-secondary: #8b5cf6; /* Purple - secondary actions */
--accent-glow: #a78bfa;      /* Light purple - highlights */

/* Text */
--text-primary: #f8fafc;     /* Almost white - main text */
--text-secondary: #cbd5e1;   /* Light gray - secondary text */
--text-muted: #64748b;       /* Gray - muted text */

/* Visualization */
--viz-primary: #10b981;      /* Emerald - audio signal */
--viz-secondary: #3b82f6;    /* Blue - frequency spectrum */
--viz-tertiary: #f59e0b;     /* Amber - peaks/highlights */
--viz-gradient-start: #6366f1;
--viz-gradient-end: #ec4899;

/* Semantic */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Gradients
```css
/* Primary gradient for visualizers */
--gradient-viz: linear-gradient(135deg,
  var(--viz-gradient-start) 0%,
  var(--viz-gradient-end) 100%);

/* Background subtle gradient */
--gradient-bg: radial-gradient(circle at top right,
  rgba(99, 102, 241, 0.1) 0%,
  transparent 50%);

/* Glow effect */
--glow-effect: 0 0 20px rgba(99, 102, 241, 0.4);
```

## Typography

### Font Stack
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;

--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono',
             'Droid Sans Mono', 'Source Code Pro', monospace;
```

### Type Scale
```css
/* Mobile */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */

/* Desktop scaling (optional) */
@media (min-width: 768px) {
  --text-base: 1.0625rem; /* 17px */
  --text-xl: 1.375rem;    /* 22px */
  --text-2xl: 1.75rem;    /* 28px */
  --text-3xl: 2.25rem;    /* 36px */
}
```

## Layout Structure

### Mobile Layout (320px - 767px)
```
┌────────────────────────────┐
│         Header             │ 60px
│  [App Title] [Status]      │
├────────────────────────────┤
│                            │
│     Visualizer Area        │ 40vh-60vh
│    (Canvas Container)      │
│                            │
├────────────────────────────┤
│   Visualizer Tabs          │ 48px
│  [Wave] [Freq] [Spec]      │
├────────────────────────────┤
│                            │
│   Control Panel            │ Auto
│   • Start/Stop Button      │
│   • Level Meter            │
│   • Settings               │
│                            │
└────────────────────────────┘
```

### Tablet Layout (768px - 1023px)
```
┌──────────────────────────────────┐
│           Header                  │ 72px
├──────────────────────────────────┤
│                                   │
│       Visualizer Area             │ 60vh
│      (Larger Canvas)              │
│                                   │
├──────────────────────────────────┤
│  [Visualizer Selector]            │
│                                   │
│  ┌─────────────┬──────────────┐  │
│  │   Controls  │   Settings   │  │
│  │   • Play    │   • FFT Size │  │
│  │   • Meter   │   • Smooth   │  │
│  └─────────────┴──────────────┘  │
└──────────────────────────────────┘
```

### Desktop Layout (1024px+)
```
┌─────────────────────────────────────────────┐
│              Header                          │ 80px
├───────────────────────────────┬─────────────┤
│                               │             │
│     Main Visualizer           │   Sidebar   │
│     (Canvas - Large)          │   • Status  │
│                               │   • Control │
│         70% width             │   • Levels  │
│         70vh                  │   • Select  │
│                               │   • Settings│
├───────────────────────────────┤             │
│  Secondary Visualizers        │   30% width │
│  [Grid of smaller viz]        │             │
└───────────────────────────────┴─────────────┘
```

## Component Specifications

### 1. Header
```
Height: 60px (mobile), 72px (tablet), 80px (desktop)
Background: bg-secondary with blur backdrop
Border-bottom: 1px solid rgba(255,255,255,0.1)

Content:
├─ App Title
│  └─ Font: text-xl, weight: 600, color: text-primary
├─ Status Indicator (right)
   └─ Recording: Pulsing red dot + "Recording"
   └─ Stopped: Gray dot + "Ready"
```

### 2. Visualizer Container
```
Aspect Ratio: 16:9 (mobile), flexible (desktop)
Background: bg-primary
Border: 1px solid rgba(255,255,255,0.05)
Border-radius: 12px
Padding: 0 (canvas fills container)
Glow: Subtle glow-effect when active

Canvas:
├─ Width: 100% of container
├─ Height: 100% of container
├─ ImageRendering: crisp-edges (for pixel-perfect rendering)
└─ Touch-action: none (prevent scrolling on touch)
```

### 3. Visualizer Tabs/Selector
```
Mobile: Horizontal scrolling tabs
Tablet/Desktop: Button group

Tab Style:
├─ Height: 48px
├─ Padding: 12px 20px
├─ Border-radius: 8px
├─ Background:
│  ├─ Active: accent-primary with glow
│  └─ Inactive: bg-tertiary
├─ Text:
│  ├─ Active: text-primary, weight: 600
│  └─ Inactive: text-secondary, weight: 400
└─ Transition: all 0.2s ease
```

### 4. Control Panel
```
Background: bg-secondary
Border-radius: 12px
Padding: 20px (mobile), 24px (desktop)
Gap: 16px between elements

Start/Stop Button:
├─ Size: 64px × 64px (mobile), 80px × 80px (desktop)
├─ Shape: Circle
├─ Background:
│  ├─ Stopped: accent-primary with gradient
│  └─ Recording: error color
├─ Icon: Microphone / Stop symbol
├─ Shadow: 0 4px 12px rgba(0,0,0,0.3)
├─ Hover: Scale 1.05, glow effect
└─ Active: Scale 0.95
```

### 5. Level Meter
```
Width: 100% (max 400px)
Height: 40px
Border-radius: 20px
Background: bg-tertiary
Border: 1px solid rgba(255,255,255,0.1)

Inner bar:
├─ Height: 32px (8px margin)
├─ Border-radius: 16px
├─ Background: Gradient based on level
│  ├─ 0-60%: success (green)
│  ├─ 60-85%: warning (amber)
│  └─ 85-100%: error (red)
├─ Animation: Smooth 0.1s ease
└─ Glow: Matches bar color
```

### 6. Settings Panel
```
Background: bg-tertiary
Border-radius: 8px
Padding: 16px

Controls:
├─ Label: text-sm, text-secondary, margin-bottom: 8px
├─ Slider:
│  ├─ Track: bg-primary, height: 4px
│  ├─ Thumb: 16px circle, accent-primary
│  └─ Fill: accent-primary
└─ Select:
   ├─ Background: bg-primary
   ├─ Border: 1px solid rgba(255,255,255,0.1)
   ├─ Border-radius: 6px
   └─ Padding: 8px 12px
```

## Animations

### Micro-interactions
```css
/* Button press */
.button {
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}
.button:active {
  transform: scale(0.95);
}

/* Recording indicator pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.recording-indicator {
  animation: pulse 2s ease-in-out infinite;
}

/* Loading shimmer */
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Visualizer Transitions
```css
/* Visualizer switch */
.visualizer-transition {
  animation: fadeIn 0.3s ease;
}

/* Data update (handled in canvas) */
- Smooth interpolation between frames
- Easing functions for natural motion
- No jarring jumps
```

## Responsive Breakpoints

```css
/* Mobile small */
@media (min-width: 320px) { /* Base styles */ }

/* Mobile large */
@media (min-width: 414px) { /* Slightly larger components */ }

/* Tablet portrait */
@media (min-width: 768px) { /* Two-column layouts */ }

/* Tablet landscape */
@media (min-width: 1024px) { /* Desktop-like layouts */ }

/* Desktop */
@media (min-width: 1280px) { /* Full desktop experience */ }

/* Large desktop */
@media (min-width: 1920px) { /* Max width constraints */ }
```

## Accessibility

### Touch Targets
- Minimum 44×44px for all interactive elements
- Adequate spacing between targets (8px minimum)

### Contrast Ratios
- Text on background: 7:1 (AAA)
- Interactive elements: 4.5:1 minimum (AA)
- Visualizations: High contrast for clarity

### Focus States
```css
.focusable:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: inherit;
}
```

### Screen Reader Support
- Semantic HTML elements
- ARIA labels for canvas visualizers
- Live regions for status updates
- Keyboard navigation support

## Dark Theme Variants

### Auto Theme Switch (Optional Phase 2)
```css
@media (prefers-color-scheme: dark) {
  /* Already optimized for dark */
}

@media (prefers-color-scheme: light) {
  /* Light theme variant if needed */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0a0a0f;
  /* ... */
}
```

## Loading States

### Initial Load
```
Skeleton screens with shimmer effect
- Header: Full width bar
- Visualizer: Rectangular placeholder with shimmer
- Controls: Circular placeholder for button
```

### Permission Request
```
Modal overlay:
├─ Backdrop: rgba(0, 0, 0, 0.8)
├─ Modal: bg-secondary, border-radius: 16px
├─ Icon: Large microphone icon
├─ Text: Clear permission request
└─ Buttons: "Allow" (primary), "Cancel" (secondary)
```

### Error States
```
Error banner:
├─ Background: error color with opacity
├─ Icon: Alert/warning icon
├─ Message: Clear error description
├─ Action: "Try Again" button
└─ Dismissible: X button in corner
```
