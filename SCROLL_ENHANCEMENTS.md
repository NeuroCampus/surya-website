# Apple-Style Cinematic Scroll Enhancements

## Overview
This document details the advanced scroll-based storytelling features inspired by Apple's cinematic web experiences, combined with ZARA's editorial calmness and architectural precision.

## New Dependencies
- **GSAP** - Professional-grade animation library with ScrollTrigger
- **Lenis** - Smooth scroll library with inertia-based scrolling

## Core Components

### 1. SmoothScroll
**Location:** `src/components/SmoothScroll.tsx`

Provides butter-smooth inertia scrolling across the entire website.

**Features:**
- Custom easing curves
- Smooth wheel scrolling
- Touch-optimized
- Automatically runs on all pages

**Usage:**
Wraps the entire app in `App.tsx` - no additional configuration needed.

---

### 2. ScrollVideo
**Location:** `src/components/ScrollVideo.tsx`

Scroll-controlled video playback where scroll position = video timeline.

**Features:**
- Video plays forward on scroll down
- Reverses on scroll up
- Frame-by-frame precision
- GSAP ScrollTrigger integration
- Scale and opacity transitions

**Usage:**
```tsx
<ScrollVideo 
  videoSrc="/path/to/video.mp4"
  posterImage={imageImport}
/>
```

**Note:** Currently displays placeholder until video file is added.

---

### 3. PinnedSection
**Location:** `src/components/PinnedSection.tsx`

Creates scroll-stack experience where sections pin in viewport during scroll.

**Features:**
- Locks viewport during scroll
- Animates pinned content
- Smooth transitions in/out
- Configurable height
- GSAP-powered precision

**Usage:**
```tsx
<PinnedSection height="300vh">
  <div className="h-screen">
    {/* Content that stays pinned while scrolling */}
  </div>
</PinnedSection>
```

---

### 4. ScrollStack
**Location:** `src/components/ScrollStack.tsx`

Stacks sections with parallax-style compression and fade effects.

**Features:**
- Scale and opacity transforms
- Vertical parallax movement
- Layer-stack visual effect
- Smooth section-to-section transitions

**Usage:**
```tsx
<ScrollStack>
  <SectionTransition>
    {/* Your section content */}
  </SectionTransition>
</ScrollStack>
```

---

### 5. MaskedTextReveal
**Location:** `src/components/MaskedTextReveal.tsx`

Letter-by-letter text reveal animation with masking.

**Features:**
- Character-by-character stagger
- Word spacing preservation
- Configurable delays
- Viewport-triggered
- Smooth ease curves

**Usage:**
```tsx
<MaskedTextReveal 
  className="text-6xl"
  delay={0.5}
  staggerDelay={0.03}
>
  Your Text Here
</MaskedTextReveal>
```

---

## Enhanced Hooks

### useScrollVelocity
**Location:** `src/hooks/useScrollVelocity.tsx`

Returns scroll velocity for speed-based animations.

**Returns:**
- `scrollY` - Current scroll position
- `scrollVelocity` - Raw scroll velocity
- `smoothVelocity` - Spring-smoothed velocity
- `velocityFactor` - Normalized velocity factor (0-5)

**Usage:**
```tsx
const { velocityFactor } = useScrollVelocity();

// Use velocityFactor to scale animation speeds
<motion.div
  animate={{ scale: 1 + velocityFactor * 0.1 }}
/>
```

---

## Implementation Examples

### Home Page Structure

```tsx
// Hero with parallax
<section className="hero">
  <MaskedTextReveal>Design • Space • Emotion</MaskedTextReveal>
</section>

// Scroll-controlled video
<PinnedSection height="300vh">
  <ScrollVideo posterImage={image} />
</PinnedSection>

// Stacked sections
<ScrollStack>
  <SectionTransition>
    {/* Featured projects */}
  </SectionTransition>
</ScrollStack>

<ScrollStack>
  <SectionTransition>
    {/* Testimonials */}
  </SectionTransition>
</ScrollStack>
```

---

## Animation Philosophy

### Apple-Style Principles
- **Subtle but noticeable** - Every scroll interaction feels intentional
- **Performance-first** - Smooth 60fps on all devices
- **Story-driven** - Scroll reveals information progressively
- **Minimal interference** - Motion enhances, never distracts

### ZARA Editorial Calmness
- **Quiet luxury** - Refined, never flashy
- **Editorial pacing** - Give content space to breathe
- **Monochromatic motion** - Elegant, timeless transitions

### Architectural Precision
- **Grid-aligned** - Everything snaps to the layout
- **Mathematical easing** - Bezier curves feel natural
- **Structural hierarchy** - Motion follows spatial logic

---

## Performance Optimization

All scroll effects use:
- Hardware-accelerated transforms (`translate3d`, `scale`, `opacity`)
- GSAP's optimized rendering
- Lenis smooth scrolling with RAF (requestAnimationFrame)
- Viewport-based triggering to reduce calculations
- Once-only animations where appropriate

---

## Future Enhancements

### Planned Features
1. **3D Model Integration** - Rotate 3D architectural models on scroll
2. **Image Sequences** - Frame-by-frame image playback (Apple style)
3. **Scroll Snap** - Section-to-section magnetic snapping
4. **Horizontal Scroll** - Side-scrolling project galleries
5. **Text Splitting Effects** - More advanced typography animations

### Video Integration
To add scroll-controlled video:
1. Place video file in `public/videos/`
2. Update ScrollVideo component with videoSrc prop
3. Optimize video for web (H.264, small file size)
4. Consider using video hosting (Vimeo, YouTube) for production

---

## Troubleshooting

### Scroll feels laggy
- Check browser DevTools Performance tab
- Ensure hardware acceleration is enabled
- Reduce number of simultaneous scroll effects

### Animations not triggering
- Verify viewport is scrolling past trigger points
- Check ScrollTrigger markers in dev mode
- Ensure elements have proper height/positioning

### Mobile performance
- Lenis automatically adjusts for touch devices
- Consider disabling heavy effects on mobile
- Test on actual devices, not just DevTools

---

## Credits & Resources

- **GSAP ScrollTrigger**: https://greensock.com/scrolltrigger/
- **Lenis Smooth Scroll**: https://github.com/studio-freight/lenis
- **Framer Motion**: https://www.framer.com/motion/
- **Inspiration**: Apple.com, awwwards.com winners

---

## Vibe Check ✨

The website should feel like:
- 🏛️ Walking through a curated architecture gallery
- 📖 Reading a luxury coffee table book
- 🎬 Watching a beautifully shot documentary
- 🧘 Calm, intentional, immersive

**Not like:**
- 🎪 A theme park
- ⚡ A racing game
- 🎨 An art explosion
- 📺 A TV commercial

---

*"Motion should feel like breathing - natural, essential, and almost unnoticed."*
