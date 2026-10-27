---
name: SANMHMD Portfolio
description: High-craft cinematic portfolio for Mohammad Ikhsan
colors:
  bg-deep: "#020203"
  bg-base: "#050506"
  bg-elevated: "#0a0a0c"
  surface: "rgba(255, 255, 255, 0.05)"
  surface-hover: "rgba(255, 255, 255, 0.08)"
  foreground: "#EDEDEF"
  foreground-muted: "#8A8F98"
  accent: "#2563EB"
  accent-bright: "#3B82F6"
  border-default: "rgba(255, 255, 255, 0.06)"
  border-hover: "rgba(255, 255, 255, 0.12)"
typography:
  display:
    fontFamily: "'Inter', -apple-system, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Inter', -apple-system, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Inter', -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  mono:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "0.85rem"
    fontWeight: 500
    letterSpacing: "0.04em"
rounded:
  sm: "6px"
  md: "12px"
  card: "16px"
  modal: "20px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
---

# Design System

## Overview
A precision dark-mode design system tailored for cinematic video production and visual storytelling. Characterized by deep obsidian backgrounds (`#050506`), electric blue and cyan focal points (`#2563EB`), hairline glassmorphism borders, and tactile micro-interactions (dual-layer cursor spotlight, 3D gyroscopic tilt, and magnetic sliding pills).

## Colors
- **Canvas (`#050506`)**: Velvet near-black minimizing eye strain and giving maximum punch to video thumbnails and photographic works.
- **Elevated Surfaces (`#0a0a0c` / `rgba(255, 255, 255, 0.05)`)**: Glassmorphism cards with backdrop blur (`16px`) and hairline boundaries.
- **Primary Accent (`#2563EB` / `#3B82F6`)**: Electric cobalt blue used for primary CTA buttons, illuminated border beams, and glowing badges.
- **Text & Foreground (`#EDEDEF` & `#8A8F98`)**: High-contrast crisp typography adhering to WCAG AAA legibility.

## Typography
- **Primary Font**: `Inter` — modern, clean geometric sans-serif for headlines and narrative body copy.
- **Technical Font**: `JetBrains Mono` — used for metadata, software specs, format ratios (9:16 / 16:9), and timecodes.

## Layout
- **Container**: Max width 1200px centered with fluid gutter padding (`24px` to `32px`).
- **Hero**: Asymmetric 3-column agency composition (left display title & CTAs, center 3D stereoscopic creator arch, right agency philosophy card).
- **Work Grid**: 2-column responsive layout showcasing high-resolution project covers with format badges.

## Elevation & Depth
- **Spotlight System**: Dual-layer cursor tracking featuring an illuminated border beam (`mask-composite: exclude` with `1.5px` padding) plus soft inner ambient radial wash (`480px`).
- **3D Parallax**: 5-layer stereoscopic depth stack behind the creator portrait incorporating a cosmic vaulted perspective tunnel.

## Shapes
- **Cards & Modals**: Rounded corners (`16px`–`20px`) with subtle inner hairline borders (`1px solid rgba(255, 255, 255, 0.06)`).
- **Interactive Badges & Buttons**: Full capsule pills (`border-radius: 9999px`).

## Components
- **Navbar**: Floating glassmorphism capsule with quick section links and primary CTA.
- **Media Modal**: Multi-format video player supporting 9:16 vertical reels and 16:9 widescreen cinema.
- **Filter Bar**: Magnetic sliding pill tracking active category with spring easing.

## Do's and Don'ts
- **DO**: Maintain 60fps GPU acceleration using `transform3d` and `will-change`.
- **DO**: Ensure all video players auto-pause and release resources on modal dismiss.
- **DON'T**: Use low-contrast gray text on dark surfaces.
- **DON'T**: Break layout flow with rigid pixel widths on mobile devices.
