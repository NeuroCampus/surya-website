# Surya Architects - Motion Design Enhancements

## Overview
The Surya Architects website has been enhanced with cinematic motion design, scroll-based storytelling, and interactive 3D elements while maintaining its minimalist luxury aesthetic.

## New Features

### 🎬 Cinematic Animations

#### 1. **Intro Animation**
- Architectural line drawing animation on page load
- Brand name fade-in with staggered timing
- 3-second duration before revealing main content

#### 2. **Scroll Progress Indicator**
- Thin accent-colored bar at the top
- Smooth spring physics animation
- Tracks scroll position throughout the page

#### 3. **Parallax Effects**
- Hero section with depth-based parallax
- Horizontal parallax for editorial-style motion
- Custom hook: `useParallax` for reusable parallax animations

#### 4. **Scroll Velocity Tracking**
- Monitors scroll speed for dynamic effects
- Smooth velocity-based transitions
- Custom hook: `useScrollVelocity`

### 🎨 Interactive Elements

#### 1. **Magnetic Buttons**
- All navigation links use magnetic attraction
- CTA buttons respond to mouse proximity
- Configurable strength parameter (0.15 - 0.5)

#### 2. **3D Tilt Cards**
- Project cards tilt based on mouse position
- Subtle 10-degree rotation range
- Spring physics for natural movement

#### 3. **Image Reveal Animations**
- Grayscale → Color transition on scroll
- Scale effect for depth perception
- Applied to all project images

#### 4. **Enhanced Custom Cursor**
- Main cursor with hover states
- Particle trail effect (last 5 positions)
- Glow effect on interactive elements
- Hidden on mobile devices

### 🌊 Section Transitions

#### 1. **Stacked Scroll Effects**
- Sections fade and scale on scroll
- Opacity transitions: 0 → 1 → 0
- Scale animations: 0.95 → 1 → 0.95

#### 2. **Masked Text Animations**
- Individual letter animations
- Staggered reveal timings
- Blur effect during transitions

#### 3. **Page Transitions**
- Smooth fade and slide between routes
- Cinematic easing curve: [0.25, 0.1, 0.25, 1]
- 0.6s transition duration

### 🎭 Design System Enhancements

#### New CSS Utilities

```css
/* Motion blur for fast movements */
.motion-blur

/* Cinematic easing */
.ease-cinematic

/* Text reveal animation */
.text-reveal

/* Ambient glow effect */
.ambient-glow
```

#### Scroll Behavior
- Smooth scroll with momentum
- Custom scrollbar styling
- Thin accent-colored scrollbar

### 🔧 New Components

1. **ScrollProgress** - Top progress bar
2. **MagneticButton** - Magnetic hover effect wrapper
3. **ImageReveal** - Grayscale to color animation
4. **Card3DTilt** - 3D tilt effect for cards
5. **SectionTransition** - Scroll-based section transitions
6. **IntroAnimation** - Page load animation
7. **AmbientAudio** - Optional ambient sound toggle (not active by default)

### 🎯 Custom Hooks

1. **useParallax** - Vertical parallax scrolling
2. **useParallaxHorizontal** - Horizontal parallax
3. **useScrollVelocity** - Scroll speed tracking

## Usage Examples

### Magnetic Button
```tsx
import MagneticButton from "@/components/MagneticButton";

<MagneticButton strength={0.4}>
  <button>Click me</button>
</MagneticButton>
```

### 3D Tilt Card
```tsx
import Card3DTilt from "@/components/Card3DTilt";

<Card3DTilt to="/projects">
  <img src={image} alt="Project" />
</Card3DTilt>
```

### Image Reveal
```tsx
import ImageReveal from "@/components/ImageReveal";

<ImageReveal 
  src={image} 
  alt="Description"
  className="w-full h-full"
/>
```

### Section Transition
```tsx
import SectionTransition from "@/components/SectionTransition";

<SectionTransition className="py-32">
  {/* Your content */}
</SectionTransition>
```

## Optional Features

### Ambient Audio
To enable ambient audio, add to your page:

```tsx
import AmbientAudio from "@/components/AmbientAudio";

<AmbientAudio audioUrl="/path-to-ambient-sound.mp3" />
```

Note: Audio file not included by default. Add your own ambient sound file if desired.

## Performance Considerations

- All animations use GPU-accelerated transforms
- Framer Motion handles optimization automatically
- Custom cursor hidden on mobile for performance
- Trail effects limited to last 5 positions
- Lazy loading and viewport detection for scroll animations

## Browser Support

- Modern browsers with ES6+ support
- Spring animations require `motion` support
- Fallbacks in place for older browsers
- Mobile-responsive with touch-friendly interactions

## Design Philosophy

All enhancements maintain the core principles:
- ✨ **Minimalism** - Motion enhances, never overwhelms
- 🎨 **Luxury** - Sophisticated, understated elegance
- 📖 **Storytelling** - Scroll-based narrative flow
- ⚡ **Performance** - Smooth 60fps animations
- 🎯 **Purpose** - Every animation serves the user experience

## Credits

Design System: Minimalist Luxury Aesthetic
Motion Design: Cinematic Editorial Style
Inspired by: ZARA, Apple, Architectural Digest
