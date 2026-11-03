<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { 
  projectsData, 
  servicesData, 
  statsData, 
  testimonialsData, 
  type Project 
} from '~/data/portfolio'
import { useProjectModal } from '~/composables/useProjectModal'

useSeoMeta({
  title: 'SANMHMD | Mohammad Ikhsan - Video Editor & Visual Creator',
  description: 'Portofolio resmi Mohammad Ikhsan (SANMHMD) — Creative Enthusiast, Video Editor, Videographer, dan Visual Creator. Spesialis Video Reels, Videografi Sinematik, dan Brand Identity.',
  ogTitle: 'SANMHMD | Mohammad Ikhsan - Video Editor & Visual Creator',
  ogDescription: 'Portofolio resmi Mohammad Ikhsan (SANMHMD) — Creative Enthusiast, Video Editor, Videographer, dan Visual Creator. Spesialis Video Reels, Videografi Sinematik, dan Brand Identity.',
  ogImage: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2',
  ogUrl: 'https://sanmhmd.vercel.app/',
  twitterCard: 'summary_large_image',
  twitterTitle: 'SANMHMD | Mohammad Ikhsan - Video Editor & Visual Creator',
  twitterDescription: 'Portofolio resmi Mohammad Ikhsan (SANMHMD) — Creative Enthusiast, Video Editor, Videographer, dan Visual Creator.',
  twitterImage: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2'
})

const { openModal, openShowreelModal } = useProjectModal()

// --- Hero 3D Tilt Physics ---
const heroCenterRef = ref<HTMLElement | null>(null)
let animFrameId: number | null = null

const initPortrait3DTilt = () => {
  if (typeof window === 'undefined') return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const heroCenter = document.querySelector('.hero-center') as HTMLElement | null
  const img = document.querySelector('.hero-framed-img') as HTMLElement | null
  const watermark = document.querySelector('.hero-outline-watermark') as HTMLElement | null
  const tunnel = document.querySelector('.hero-perspective-tunnel') as HTMLElement | null
  const aura = document.querySelector('.backlight-aura-sphere') as HTMLElement | null
  const backdrop = document.querySelector('.hero-portal-arch-backdrop') as HTMLElement | null

  if (!heroCenter || !img) return

  let targetRotateX = 0, targetRotateY = 0
  let targetTransX = 0, targetTransY = 0
  let currentRotateX = 0, currentRotateY = 0
  let currentTransX = 0, currentTransY = 0

  const updatePhysics = () => {
    currentRotateX += (targetRotateX - currentRotateX) * 0.20
    currentRotateY += (targetRotateY - currentRotateY) * 0.20
    currentTransX += (targetTransX - currentTransX) * 0.20
    currentTransY += (targetTransY - currentTransY) * 0.20

    img.style.transform = `perspective(1200px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translate3d(${currentTransX.toFixed(1)}px, ${currentTransY.toFixed(1)}px, 0)`

    if (watermark) {
      watermark.style.transform = `translate(calc(-50% + ${(-currentTransX * 1.2).toFixed(1)}px), calc(-50% + ${(-currentTransY * 1.2).toFixed(1)}px))`
    }

    if (tunnel) {
      tunnel.style.transform = `translateX(-50%) translate3d(${(-currentTransX * 0.45).toFixed(1)}px, ${(-currentTransY * 0.35).toFixed(1)}px, 0) rotateX(${(-currentRotateX * 0.35).toFixed(2)}deg) rotateY(${(-currentRotateY * 0.35).toFixed(2)}deg)`
    }

    if (aura) {
      aura.style.transform = `translate(calc(-50% + ${(currentTransX * 0.5).toFixed(1)}px), ${(currentTransY * 0.5).toFixed(1)}px) scale(${heroCenter.matches(':hover') ? 1.22 : 1})`
    }

    if (backdrop) {
      backdrop.style.transform = `translateX(-50%) translate3d(${(currentTransX * 0.35).toFixed(1)}px, ${(currentTransY * 0.25).toFixed(1)}px, 0)`
    }

    animFrameId = requestAnimationFrame(updatePhysics)
  }

  animFrameId = requestAnimationFrame(updatePhysics)

  const handleHeroMouse = (e: MouseEvent) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1
    const normY = (e.clientY / window.innerHeight) * 2 - 1
    targetRotateX = -normY * 2.8
    targetRotateY = normX * 2.8
    targetTransX = normX * 8
    targetTransY = normY * 6
  }

  window.addEventListener('mousemove', handleHeroMouse, { passive: true })
}

// --- Filter & Sliding Pill for Projects ---
const activeFilter = ref('All')
const activeKey = ref('')

const filterConfigs = [
  { label: 'All Curated', filter: 'All', key: '' },
  { label: 'Video Editing', filter: 'Video Editing', key: 'category' },
  { label: 'Videography', filter: 'Videography', key: 'category' },
  { label: 'UI/UX Design', filter: 'UI/UX Design', key: 'category' },
  { label: 'Brand Identity', filter: 'Brand Identity', key: 'category' }
]

const getFilterCount = (cfg: { filter: string; key: string }) => {
  if (cfg.filter === 'All') return projectsData.length
  return projectsData.filter((p: Project) => {
    if (cfg.key === 'subCategory') return p.subCategory === cfg.filter
    return p.category === cfg.filter
  }).length
}

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projectsData
  return projectsData.filter((p: Project) => {
    if (activeKey.value === 'subCategory') return p.subCategory === activeFilter.value
    return p.category === activeFilter.value || p.subCategory === activeFilter.value
  })
})

const pillStyle = ref({
  width: '0px',
  height: '0px',
  transform: 'translate(0px, 0px)',
  opacity: '0'
})

const setFilter = (filter: string, key: string, e?: MouseEvent) => {
  activeFilter.value = filter
  activeKey.value = key

  nextTick(() => {
    const target = e?.currentTarget as HTMLElement || document.querySelector('.filter-btn.active') as HTMLElement
    updatePillPosition(target)
  })
}

const updatePillPosition = (btnEl?: HTMLElement | null) => {
  const container = document.getElementById('project-filters')
  const el = btnEl || document.querySelector('.filter-btn.active') as HTMLElement | null
  if (!container || !el) return

  const btnRect = el.getBoundingClientRect()
  const contRect = container.getBoundingClientRect()

  pillStyle.value = {
    width: `${btnRect.width}px`,
    height: `${btnRect.height}px`,
    transform: `translate(${btnRect.left - contRect.left}px, ${btnRect.top - contRect.top}px)`,
    opacity: '1'
  }
}

const getProjectTags = (project: Project) => {
  const tag1 = project.category || 'Creative Work'
  let tag2 = project.subCategory || (project.specs?.format ? project.specs.format.split(' ')[0] : (project.tags ? project.tags[0] : ''))
  if (tag2 && tag2.toLowerCase() === tag1.toLowerCase()) {
    tag2 = (project.tags && project.tags[1]) ? project.tags[1] : (project.tags && project.tags[0] ? project.tags[0] : '')
  }
  return { tag1, tag2 }
}

// --- Testimonial Slider ---
const currentTestiIdx = ref(0)
const nextTestimonial = () => {
  currentTestiIdx.value = (currentTestiIdx.value + 1) % testimonialsData.length
}
const prevTestimonial = () => {
  currentTestiIdx.value = (currentTestiIdx.value - 1 + testimonialsData.length) % testimonialsData.length
}

onMounted(() => {
  initPortrait3DTilt()
  nextTick(() => {
    updatePillPosition()
    document.querySelectorAll('.reveal').forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 150) {
        el.classList.add('active', 'visible')
      }
    })
  })
  window.addEventListener('resize', () => updatePillPosition(), { passive: true })
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
})
</script>

<template>
  <div>
    <!-- =========================================
         HERO SECTION (3-Column Ohio Agency Layout)
         ========================================= -->
    <section class="hero" id="hero">
      <div class="container hero-container hero-grid-3col">
        <!-- Kolom Kiri: Display Typography & Lead Description -->
        <div class="hero-col hero-left flex-col justify-center reveal reveal-delay-1">
          <h1 class="hero-title">
            Visual<br>
            <span class="title-serif text-accent">Creative.</span>
          </h1>
          <p class="hero-sublead text-muted">
            Creative Enthusiast &amp; Visual Creator merangkai dua konsentrasi: videografi sinematik &amp;
            editing ritmis, serta desain grafis, carousel, dan antarmuka UI/UX.
          </p>
        </div>

        <!-- Kolom Tengah: Foto Profil dengan 3D Depth, Backlight Aura, dan Portal Arch Backdrop -->
        <div class="hero-col hero-center flex items-end justify-center reveal reveal-delay-2" ref="heroCenterRef">
          <!-- Big Outline Watermark Layer (Efek Huda Muliya) -->
          <div class="hero-outline-watermark" aria-hidden="true">
            <span>CREATIVE</span>
          </div>

          <!-- Cosmic Perspective Depth Grid / Radial Tunnel -->
          <div class="hero-perspective-tunnel" aria-hidden="true">
            <svg class="tunnel-svg" viewBox="0 0 400 640" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="tunnelCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.65" />
                  <stop offset="40%" stop-color="#6366F1" stop-opacity="0.25" />
                  <stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
                </radialGradient>
                <linearGradient id="rayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#93C5FD" stop-opacity="0.4" />
                  <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.18" />
                  <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0.02" />
                </linearGradient>
                <linearGradient id="archGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#93C5FD" stop-opacity="0.5" />
                  <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.2" />
                  <stop offset="100%" stop-color="#2563EB" stop-opacity="0.03" />
                </linearGradient>
              </defs>

              <!-- Radial Perspective Rays -->
              <g class="tunnel-rays" stroke="url(#rayGrad)" stroke-width="1" opacity="0.8">
                <line x1="200" y1="340" x2="200" y2="30" stroke-dasharray="3 4" />
                <line x1="200" y1="340" x2="140" y2="35" />
                <line x1="200" y1="340" x2="260" y2="35" />
                <line x1="200" y1="340" x2="80" y2="75" stroke-dasharray="4 6" />
                <line x1="200" y1="340" x2="320" y2="75" stroke-dasharray="4 6" />
                <line x1="200" y1="340" x2="30" y2="160" />
                <line x1="200" y1="340" x2="370" y2="160" />
                <line x1="200" y1="340" x2="30" y2="280" stroke-dasharray="3 5" />
                <line x1="200" y1="340" x2="370" y2="280" stroke-dasharray="3 5" />
                <line x1="200" y1="340" x2="30" y2="440" />
                <line x1="200" y1="340" x2="370" y2="440" />
                <line x1="200" y1="340" x2="30" y2="640" stroke-dasharray="4 6" />
                <line x1="200" y1="340" x2="370" y2="640" stroke-dasharray="4 6" />
                <line x1="200" y1="340" x2="110" y2="640" />
                <line x1="200" y1="340" x2="290" y2="640" />
              </g>

              <!-- Concentric Arch Rings -->
              <path d="M 30,640 L 30,200 A 170,170 0 0,1 370,200 L 370,640" stroke="url(#archGrad)"
                stroke-width="1.2" fill="none" opacity="0.65" />
              <path d="M 65,640 L 65,235 A 135,135 0 0,1 335,235 L 335,640" stroke="url(#archGrad)"
                stroke-width="1.2" stroke-dasharray="4 4" fill="none" opacity="0.75" />
              <path d="M 100,640 L 100,270 A 100,100 0 0,1 300,270 L 300,640" stroke="url(#archGrad)"
                stroke-width="1.4" fill="none" opacity="0.8" />
              <path d="M 135,640 L 135,305 A 65,65 0 0,1 265,305 L 265,640" stroke="url(#archGrad)"
                stroke-width="1.4" stroke-dasharray="3 3" fill="none" opacity="0.85" />

              <!-- Vanishing Focal Node & Aura -->
              <circle cx="200" cy="340" r="48" fill="url(#tunnelCoreGlow)" />
              <circle cx="200" cy="340" r="32" stroke="rgba(147, 197, 253, 0.3)" stroke-width="1"
                stroke-dasharray="2 4" />
              <circle cx="200" cy="340" r="14" stroke="#60A5FA" stroke-width="1.2" opacity="0.75" />
              <circle cx="200" cy="340" r="3" fill="#FFFFFF" opacity="0.95" />

              <!-- Tech Coordinate Indicators -->
              <g class="tunnel-tech-markers" font-family="'JetBrains Mono', monospace" font-size="6.5"
                fill="rgba(147, 197, 253, 0.5)" letter-spacing="1.5">
                <text x="200" y="20" text-anchor="middle">DEPTH ARCH · 01</text>
                <circle cx="200" cy="30" r="2.5" fill="#60A5FA" opacity="0.85" />
                <circle cx="140" cy="35" r="2" fill="#93C5FD" opacity="0.65" />
                <circle cx="260" cy="35" r="2" fill="#93C5FD" opacity="0.65" />
                <circle cx="80" cy="75" r="2" fill="#60A5FA" opacity="0.55" />
                <circle cx="320" cy="75" r="2" fill="#60A5FA" opacity="0.55" />
              </g>
            </svg>
          </div>

          <!-- Kotak / Vaulted Arch Portal Backdrop (Di BELAKANG Foto) -->
          <div class="hero-portal-arch-backdrop" aria-hidden="true"></div>

          <!-- Backlight Aura Glow Sphere (Efek Huda Muliya) -->
          <div class="backlight-aura-sphere" aria-hidden="true"></div>

          <!-- Cutout Subject Photo -->
          <picture style="display: contents;">
            <source srcset="/assets/images/photo-profile-bust.webp" type="image/webp">
            <img src="/assets/images/photo-profile-bust.png?v=10.14"
              alt="Mohammad Ikhsan - Video Editor &amp; Visual Creator" class="hero-framed-img"
              loading="eager" fetchpriority="high">
          </picture>
        </div>

        <!-- Kolom Kanan: Agency Bio & Fast Highlights -->
        <div class="hero-col hero-right flex-col justify-center reveal reveal-delay-3">
          <div class="hero-bio-card spotlight-card">
            <div class="bio-card-header">
              <span class="bio-tag-pill">Philosophy</span>
              <span class="bio-location-pill"><span class="badge-dot"></span> Yogyakarta, ID</span>
            </div>
            <p class="hero-bio-text">
              Membantu brand, creator, dan agency menyampaikan cerita lewat video beritme dinamis, footage
              berkelas sinematik, serta visual design yang membekas di benak audiens.
            </p>
            <div class="hero-meta-grid">
              <div class="meta-item">
                <span class="meta-num">3<span class="meta-accent">+</span></span>
                <span class="meta-label">Years of Craft</span>
              </div>
              <div class="meta-item">
                <span class="meta-num">25<span class="meta-accent">+</span></span>
                <span class="meta-label">Delivered Projects</span>
              </div>
            </div>
            <div class="bio-card-action">
              <a href="https://wa.me/6281807882493?text=Halo%20Ikhsan,%20saya%20tertarik%20bekerja%20sama%20dan%20ingin%20meminta%20Rate%20Card%20/%20Katalog%20Layanan%20terbaru." 
                target="_blank" rel="noopener noreferrer" class="bio-rate-link" title="Minta Rate Card &amp; Paket Kolaborasi">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Request Rate Card / PDF ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         ABOUT SECTION
         ========================================= -->
    <section id="about" class="container about-section">
      <div class="section-header-split reveal">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-num">02 //</span>
            <span class="eyebrow-text">ABOUT THE CREATOR</span>
          </div>
          <h2 class="section-title">Driven by Visual Pacing &amp; <span class="title-serif text-accent">Cinematic Detail</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Menyatukan kepekaan audio-visual, ritme potongan presisi, dan arahan seni modern untuk
            melahirkan konten berdaya resonansi tinggi bagi audiens digital masa kini.
          </p>
        </div>
      </div>

      <div class="about-grid grid grid-cols-2 gap-xl items-center">
        <!-- Sisi Kiri: Profil Card Glassmorphism -->
        <div class="about-visual reveal">
          <div class="about-card rounded-card">
            <div class="about-badge text-accent">
              <span class="badge-dot"></span> Available for New Projects
            </div>
            <h3 class="about-name mt-sm">Mohammad Ikhsan</h3>
            <p class="about-role text-muted font-sm">Creative Enthusiast | Video Editor &amp; Visual Creator</p>

            <div class="about-stats-row grid grid-cols-2 gap-md mt-md">
              <div class="stat-mini">
                <span class="stat-num text-accent">3+</span>
                <span class="stat-desc text-muted">Years Experience</span>
              </div>
              <div class="stat-mini">
                <span class="stat-num text-accent">20+</span>
                <span class="stat-desc text-muted">Projects Completed</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sisi Kanan: Headline & Deskripsi Singkat -->
        <div class="about-content reveal reveal-delay-2">
          <h3 class="about-headline">Crafting <span class="title-serif text-accent">Visual Stories</span>, Cinematic Videos &amp; Modern Brand Identities</h3>
          <p class="about-desc text-muted mt-md">
            Halo! Saya Mohammad Ikhsan, seorang Creative Enthusiast yang berfokus pada penceritaan visual
            melalui Video Editing, Videografi, Fotografi, dan Desain Grafis. Saya membantu brand dan
            individu menyampaikan pesan mereka lewat konten yang estetik, sinematik, dan berdampak.
          </p>
          <div class="about-actions flex items-center gap-md mt-lg">
            <a href="#contact" class="btn btn-primary rounded-pill">Hubungi Saya</a>
            <a href="https://www.instagram.com/san_mhmd17/" target="_blank" rel="noopener noreferrer"
              class="btn btn-secondary rounded-pill flex items-center gap-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Portofolio Visual</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         DUAL CONCENTRATION PORTAL
         ========================================= -->
    <section id="tracks" class="container portal-tracks-section">
      <div class="portal-header text-center reveal">
        <div class="section-eyebrow">
          <span class="eyebrow-text">DISCIPLINES &amp; SPECIALIZATIONS</span>
        </div>
        <h2 class="section-title">Two Worlds. <span class="title-serif text-accent">One Creative Vision.</span></h2>
        <p class="section-lead-desc text-muted mx-auto max-w-lg mt-xs">
          Pilih konsentrasi di bawah ini untuk melihat portofolio spesifik, studi kasus terperinci, dan alur kerja produksi masing-masing bidang.
        </p>
      </div>

      <div class="portal-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-xl">
        <!-- Card 1: Cinema & Visual Media -->
        <div class="portal-card portal-cinema rounded-card bg-card reveal reveal-delay-1">
          <div class="portal-card-glow cinema-glow"></div>
          <div class="portal-card-top flex items-center justify-between">
            <span class="portal-tag">TRACK 01 // AUDIO-VISUAL</span>
            <span class="portal-badge cinema-badge">4K · Aerial · Pacing</span>
          </div>
          <div class="portal-card-media mt-md cursor-pointer group" @click="openModal(2)" title="Tonton Video: Elevating Your Perspective (SANS DRONE)">
            <img src="/images/project-sans-drone.webp" alt="Elevating Your Perspective - SANS DRONE" class="portal-preview-img" loading="lazy">
            <div class="portal-media-overlay">
              <div class="portal-media-top flex items-center justify-between">
                <span class="playback-indicator"><span class="rec-dot"></span> REC · 4K UHD</span>
                <span class="portal-badge-yt font-mono font-xs">YouTube 16:9</span>
              </div>
              <div class="portal-media-center">
                <div class="portal-play-btn" aria-label="Play Video">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div class="portal-media-bottom">
                <span class="portal-footage-title font-mono font-xs">Elevating Your Perspective</span>
                <span class="portal-footage-client font-xs text-muted">SANS DRONE · Sewa Drone Jogja</span>
              </div>
            </div>
          </div>
          <h3 class="portal-title mt-md">Cinema &amp; Visual Media</h3>
          <p class="portal-desc text-muted mt-xs">
            Spesialisasi visual udara drone sinematik 4K, videografi komersial, editing ritmis dinamis (Reels/TikTok), serta color grading filmis terkalibrasi.
          </p>
          <div class="portal-pills flex flex-wrap gap-xs mt-md">
            <span class="tech-badge">Drone Pilot</span>
            <span class="tech-badge">Videographer</span>
            <span class="tech-badge">Video Editor</span>
            <span class="tech-badge">Colorist</span>
            <NuxtLink to="/cinema#color-grading" class="tech-badge" style="border-color: rgba(0,240,255,0.4); color: #00F0FF; text-decoration: none;" title="Buka Interactive Color Grading Studio">Grading Studio ↗</NuxtLink>
          </div>
          <div class="portal-card-footer mt-lg flex items-center justify-between">
            <span class="portal-meta font-mono font-xs text-muted">DaVinci Resolve · CapCut Pro · DJI Drone · Sony 4K</span>
            <NuxtLink to="/cinema" class="btn btn-primary rounded-pill portal-btn">
              <span>Enter Cinema Track</span>
              <span class="btn-arrow">↗</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Card 2: Graphic & Digital Design -->
        <div class="portal-card portal-design rounded-card bg-card reveal reveal-delay-2">
          <div class="portal-card-glow design-glow"></div>
          <div class="portal-card-top flex items-center justify-between">
            <span class="portal-tag">TRACK 02 // COMMUNICATION &amp; PRODUCT</span>
            <span class="portal-badge design-badge">Figma · Vector · System</span>
          </div>
          <div class="portal-card-media mt-md cursor-pointer group" @click="openModal(111)" title="Lihat Projek: Desain Poster &amp; Event IMABA">
            <img src="/images/mockup-maslahah.webp" alt="Graphic &amp; UI/UX Design" class="portal-preview-img" loading="lazy">
            <div class="portal-media-overlay">
              <div class="portal-media-top flex items-center justify-between">
                <span class="playback-indicator" style="background: rgba(16, 185, 129, 0.2); color: #6EE7B7; border-color: rgba(16, 185, 129, 0.4);">
                  <span class="rec-dot" style="background: #10B981;"></span> DESIGN SYSTEM
                </span>
                <span class="portal-badge-yt font-mono font-xs" style="border-color: rgba(16, 185, 129, 0.3);">UI/UX &amp; Brand</span>
              </div>
              <div class="portal-media-center"></div>
              <div class="portal-media-bottom">
                <span class="portal-footage-title font-mono font-xs">Maslahah Ecosystem UI/UX</span>
                <span class="portal-footage-client font-xs text-muted">Fintech Dashboard &amp; Mobile App</span>
              </div>
            </div>
          </div>
          <h3 class="portal-title mt-md">Graphic &amp; UI/UX Design</h3>
          <p class="portal-desc text-muted mt-xs">
            Fokus pada perancangan antarmuka digital (UI/UX) web &amp; mobile, brand identity eksklusif, rangkaian carousel media sosial berslide edukatif, dan poster tipografi modern.
          </p>
          <div class="portal-pills flex flex-wrap gap-xs mt-md">
            <span class="tech-badge">UI/UX Design</span>
            <span class="tech-badge">Brand Identity</span>
            <span class="tech-badge">Social Carousel</span>
            <span class="tech-badge">Poster Design</span>
          </div>
          <div class="portal-card-footer mt-lg flex items-center justify-between">
            <span class="portal-meta font-mono font-xs text-muted">Figma · Photoshop · CorelDraw · Canva</span>
            <NuxtLink to="/design" class="btn btn-secondary rounded-pill portal-btn">
              <span>Enter Design Track</span>
              <span class="btn-arrow">↗</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         CREATIVE ARSENAL / TECH STACK DOCK (Compact 3-col mobile preserved)
         ========================================= -->
    <section class="skills-stack-section" id="gear">
      <div class="container">
        <div class="skills-header text-center reveal">
          <div class="section-eyebrow">
            <span class="eyebrow-num">04 //</span>
            <span class="eyebrow-text">CREATIVE ARSENAL &amp; TOOLSET</span>
          </div>
          <h2 class="section-title">Production Gear &amp; <span class="title-serif text-accent">Creative Stack</span></h2>
          <p class="section-lead-desc text-muted mx-auto max-w-lg mt-xs">
            Aplikasi dan perangkat standar industri yang saya andalkan untuk menghasilkan visual sinematik, video vertikal dinamis, dan produk antarmuka digital.
          </p>
        </div>

        <div class="skills-grid">
          <!-- 1. Premiere Pro -->
          <div class="skill-card" data-tooltip="Adobe Premiere Pro" title="Adobe Premiere Pro">
            <div class="skill-icon-wrapper">
              <img src="/images/logo-premiere.webp" alt="Adobe Premiere Pro" class="skill-app-img" loading="lazy">
            </div>
            <span class="skill-name">Premiere Pro</span>
          </div>

          <!-- 2. CapCut Pro -->
          <div class="skill-card" data-tooltip="CapCut Pro" title="CapCut Pro">
            <div class="skill-icon-wrapper">
              <img src="/images/logo-capcut.webp" alt="CapCut Pro" class="skill-app-img" loading="lazy">
            </div>
            <span class="skill-name">CapCut Pro</span>
          </div>

          <!-- 3. After Effects -->
          <div class="skill-card" data-tooltip="Adobe After Effects" title="Adobe After Effects">
            <div class="skill-icon-wrapper">
              <svg class="skill-app-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#00005B" />
                <rect x="0.5" y="0.5" width="47" height="47" rx="10.5" stroke="rgba(153,153,255,0.2)" />
                <path d="M14 32L18.8 17h3.4L27 32h-3.2l-1.3-4.2h-4.8L16.4 32H14zm4.4-7h3.3l-1.6-5.8h-.1l-1.6 5.8z" fill="#9999FF" />
                <path d="M28.5 25.8c0-3.8 2.6-6.8 6.2-6.8 3.5 0 5.7 2.6 5.7 6.4v.8h-8.8c.2 2 1.6 3.2 3.4 3.2 1.4 0 2.4-.6 3-1.6l2.3 1.4c-1.1 1.7-2.8 2.8-5.3 2.8-3.9 0-6.5-2.7-6.5-6.2zm8.8-1.5c-.1-1.7-1.3-2.9-2.9-2.9-1.6 0-2.8 1.1-3 2.9h5.9z" fill="#9999FF" />
              </svg>
            </div>
            <span class="skill-name">After Effects</span>
          </div>

          <!-- 4. DaVinci Resolve -->
          <div class="skill-card" data-tooltip="DaVinci Resolve" title="DaVinci Resolve">
            <div class="skill-icon-wrapper">
              <svg class="skill-app-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#14171C" />
                <rect x="0.5" y="0.5" width="47" height="47" rx="10.5" stroke="rgba(255,255,255,0.12)" />
                <path d="M24 10c-3.5 0-6 3-4.5 6.5l3.5 7.5 3.5-7.5c1.5-3.5-1-6.5-4.5-6.5z" fill="#FF3850" />
                <path d="M12 31c2 3 5.5 3.5 8 1.5l7-4.5-8-2c-3.8-1-6.5 1.5-7 5z" fill="#00DF73" />
                <path d="M36 31c-2 3-5.5 3.5-8 1.5l-7-4.5 8-2c3.8-1 6.5 1.5 7 5z" fill="#00A6FF" />
                <circle cx="24" cy="24" r="2.8" fill="#FFFFFF" />
              </svg>
            </div>
            <span class="skill-name">DaVinci</span>
          </div>

          <!-- 5. Sony Alpha 4K -->
          <div class="skill-card" data-tooltip="Sony Alpha 4K Camera" title="Sony Alpha 4K Camera">
            <div class="skill-icon-wrapper">
              <svg class="skill-app-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#18181A" />
                <rect x="0.5" y="0.5" width="47" height="47" rx="10.5" stroke="rgba(255,255,255,0.12)" />
                <path d="M24.5 13c-4.2 0-7.5 3.2-7.5 7.5 0 2.8 1.4 5.2 3.6 6.5L14 34h4.2l5.2-5.8c.4.1.8.1 1.1.1 4.5 0 8-3.2 8-7.5 0-4.3-3.5-7.8-8-7.8zm0 11.8c-2.4 0-4.3-1.8-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z" fill="#FF5E00" />
                <path d="M24.5 21.2a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6z" fill="#FFA500" />
                <rect x="29" y="30" width="13" height="7" rx="2" fill="#FF5E00" fill-opacity="0.2" />
                <text x="30.5" y="35.5" font-family="'JetBrains Mono', monospace" font-size="5" font-weight="700" fill="#FF8A3D">4K</text>
              </svg>
            </div>
            <span class="skill-name">Sony Alpha</span>
          </div>

          <!-- 6. DJI Drone -->
          <div class="skill-card" data-tooltip="DJI Aerial Drone" title="DJI Aerial Drone">
            <div class="skill-icon-wrapper">
              <svg class="skill-app-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#14171F" />
                <rect x="0.5" y="0.5" width="47" height="47" rx="10.5" stroke="rgba(94,106,210,0.25)" />
                <rect x="21" y="19" width="6" height="10" rx="3" fill="#E2E8F0" />
                <circle cx="24" cy="22" r="1.8" fill="#5E6AD2" />
                <line x1="16" y1="16" x2="22" y2="21" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" />
                <line x1="32" y1="16" x2="26" y2="21" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" />
                <line x1="16" y1="32" x2="22" y2="27" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" />
                <line x1="32" y1="32" x2="26" y2="27" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" />
                <circle cx="15" cy="15" r="4" stroke="#6872D9" stroke-width="1.6" fill="rgba(94,106,210,0.2)" />
                <circle cx="33" cy="15" r="4" stroke="#6872D9" stroke-width="1.6" fill="rgba(94,106,210,0.2)" />
                <circle cx="15" cy="33" r="4" stroke="#6872D9" stroke-width="1.6" fill="rgba(94,106,210,0.2)" />
                <circle cx="33" cy="33" r="4" stroke="#6872D9" stroke-width="1.6" fill="rgba(94,106,210,0.2)" />
                <circle cx="15" cy="15" r="1.2" fill="#FFFFFF" />
                <circle cx="33" cy="15" r="1.2" fill="#FFFFFF" />
                <circle cx="15" cy="33" r="1.2" fill="#FFFFFF" />
                <circle cx="33" cy="33" r="1.2" fill="#FFFFFF" />
              </svg>
            </div>
            <span class="skill-name">DJI Drone</span>
          </div>

          <!-- 7. Figma -->
          <div class="skill-card" data-tooltip="Figma UI/UX &amp; Design Systems" title="Figma UI/UX &amp; Design Systems">
            <div class="skill-icon-wrapper">
              <svg class="skill-app-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#1C1C1E" />
                <rect x="0.5" y="0.5" width="47" height="47" rx="10.5" stroke="rgba(255,255,255,0.12)" />
                <g transform="translate(14, 10)">
                  <path d="M0 0h5a5 5 0 0 1 0 10H0V0z" fill="#FF7262" transform="translate(5, 0)" />
                  <path d="M5 0a5 5 0 0 0-5 5 5 5 0 0 0 5 5h5V0H5z" fill="#F24E1E" />
                  <path d="M5 10a5 5 0 0 0-5 5 5 5 0 0 0 5 5h5v-10H5z" fill="#A259FF" />
                  <circle cx="15" cy="15" r="5" fill="#1ABCFE" />
                  <path d="M5 20a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5v-5H5z" fill="#0ACF83" />
                </g>
              </svg>
            </div>
            <span class="skill-name">Figma</span>
          </div>

          <!-- 8. Photoshop -->
          <div class="skill-card" data-tooltip="Adobe Photoshop" title="Adobe Photoshop">
            <div class="skill-icon-wrapper">
              <img src="/images/logo-photoshop.png" alt="Adobe Photoshop" class="skill-app-img" loading="lazy">
            </div>
            <span class="skill-name">Photoshop</span>
          </div>

          <!-- 9. Illustrator -->
          <div class="skill-card" data-tooltip="Adobe Illustrator" title="Adobe Illustrator">
            <div class="skill-icon-wrapper">
              <svg class="skill-app-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="11" fill="#330000" />
                <rect x="0.5" y="0.5" width="47" height="47" rx="10.5" stroke="rgba(255,154,0,0.2)" />
                <path d="M14 32L18.8 17h3.4L27 32h-3.2l-1.3-4.2h-4.8L16.4 32H14zm4.4-7h3.3l-1.6-5.8h-.1l-1.6 5.8z" fill="#FF9A00" />
                <path d="M29.5 20h3.2V32h-3.2V20zm0-4.5a1.8 1.8 0 1 1 3.6 0 1.8 1.8 0 0 1-3.6 0z" fill="#FF9A00" />
              </svg>
            </div>
            <span class="skill-name">Illustrator</span>
          </div>

          <!-- 10. Lightroom -->
          <div class="skill-card" data-tooltip="Adobe Lightroom" title="Adobe Lightroom">
            <div class="skill-icon-wrapper">
              <img src="/images/logo-lightroom.png" alt="Adobe Lightroom" class="skill-app-img" loading="lazy">
            </div>
            <span class="skill-name">Lightroom</span>
          </div>

          <!-- 11. CorelDraw -->
          <div class="skill-card" data-tooltip="CorelDraw" title="CorelDraw">
            <div class="skill-icon-wrapper">
              <img src="/images/logo-coreldraw.png" alt="CorelDraw" class="skill-app-img" loading="lazy">
            </div>
            <span class="skill-name">CorelDraw</span>
          </div>

          <!-- 12. Canva Pro -->
          <div class="skill-card" data-tooltip="Canva Pro" title="Canva Pro">
            <div class="skill-icon-wrapper">
              <img src="/images/logo-canva.png" alt="Canva Pro" class="skill-app-img" loading="lazy">
            </div>
            <span class="skill-name">Canva Pro</span>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         SERVICES SECTION (Sekeco Style)
         ========================================= -->
    <section id="services" class="container">
      <div class="section-header-split reveal">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">EXPERTISE &amp; CAPABILITIES</span>
          </div>
          <h2 class="section-title">Creative <span class="title-serif text-accent">Services</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Layanan produksi visual terpadu — dari editing reels dinamis, pengambilan gambar drone sinematik, hingga identitas desain grafis berdaya saing global.
          </p>
        </div>
      </div>

      <div class="services-grid-sekeco mt-lg">
        <NuxtLink 
          v-for="(service, i) in servicesData" 
          :key="service.id"
          :to="service.link.replace('.html', '')" 
          class="service-card-sekeco spotlight-card reveal rounded-card group" 
          :class="`reveal-delay-${(i % 3) + 1}`"
          :data-color="service.color || 'cyan'"
        >
          <div class="service-badge-icon" :class="`color-${service.color || 'cyan'}`" aria-hidden="true" v-html="service.icon"></div>
          <div class="service-body">
            <h3 class="service-heading">{{ service.title }}</h3>
            <p class="service-desc text-muted">{{ service.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- =========================================
         WORK (PORTFOLIO) SECTION
         ========================================= -->
    <section id="work" class="container">
      <div class="section-header-split reveal mt-xl mb-lg">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">CURATED PORTFOLIO</span>
          </div>
          <h2 class="section-title">Selected <span class="title-serif text-accent">Works</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Koleksi karya visual pilihan berfokus pada storytelling ritmis, estetika sinematik, dan dampak engagement nyata bagi brand.
          </p>
        </div>
      </div>

      <!-- Filter Bar with Sliding Pill -->
      <div class="project-filters flex gap-sm flex-wrap justify-start mb-lg" id="project-filters">
        <span class="filter-sliding-pill" id="filter-sliding-pill" :style="pillStyle" aria-hidden="true"></span>
        <button 
          v-for="cfg in filterConfigs" 
          :key="cfg.filter"
          class="filter-btn"
          :class="{ active: activeFilter === cfg.filter }"
          :data-filter="cfg.filter"
          :data-key="cfg.key"
          @click="setFilter(cfg.filter, cfg.key, $event)"
        >
          {{ cfg.label }} <span class="filter-count">{{ getFilterCount(cfg) }}</span>
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-2 gap-lg projects-grid" id="projects-container">
        <div 
          v-for="(project, i) in filteredProjects" 
          :key="project.id"
          class="project-card spotlight-card reveal rounded-card group"
          :class="`reveal-delay-${(i % 4) + 1}`"
          :data-id="project.id"
          @click="openModal(project)"
          style="cursor: pointer;"
        >
          <div class="project-card-inner">
            <div class="project-card-content">
              <div class="project-card-tags">
                <span class="project-tag-pill">{{ getProjectTags(project).tag1 }}</span>
                <span v-if="getProjectTags(project).tag2" class="project-tag-pill">{{ getProjectTags(project).tag2 }}</span>
              </div>
              <h3 class="project-title">
                <span>{{ project.title }}</span>
                <span class="project-title-arrow" aria-hidden="true">↗</span>
              </h3>
              <p class="project-short-desc text-muted">{{ project.description }}</p>
            </div>
            <div class="project-card-media">
              <img :src="project.image" :alt="project.title" class="project-image" loading="lazy" onerror="this.style.opacity='0';">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         IMPACT SECTION
         ========================================= -->
    <section id="impact" class="container">
      <div class="section-header-split reveal mb-lg">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">MEASURABLE VALUE</span>
          </div>
          <h2 class="section-title">Proven <span class="title-serif text-accent">Impact</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Konsistensi kualitas, ketepatan tenggat waktu, dan kepuasan klien yang terbukti dalam setiap karya visual yang kami rilis.
          </p>
        </div>
      </div>

      <div class="impact-grid border-t border-b" style="border-top: 1px solid var(--border-default); border-bottom: 1px solid var(--border-default); padding-block: 60px;">
        <div v-for="stat in statsData" :key="stat.label" class="stat-item reveal">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- =========================================
         TESTIMONIALS SECTION
         ========================================= -->
    <section id="testimonials" class="container">
      <div class="section-header-split reveal mb-lg">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">CLIENT TESTIMONIALS</span>
          </div>
          <h2 class="section-title">Client <span class="title-serif text-accent">Feedback</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Apa kata para brand owner, kreator konten, dan tim komersial tentang kolaborasi kreatif bersama Mohammad Ikhsan.
          </p>
        </div>
      </div>

      <div class="testimonial-slider reveal reveal-delay-2">
        <div class="testimonial-track" id="testimonial-track" :style="{ transform: `translateX(-${currentTestiIdx * 100}%)`, transition: 'transform 0.5s ease-in-out' }">
          <div v-for="testi in testimonialsData" :key="testi.id" class="testimonial-card">
            <div class="quote-icon">“</div>
            <p class="testimonial-quote">{{ testi.quote }}</p>
            <div class="testimonial-author">
              <img :src="testi.avatar" :alt="testi.name || testi.author" class="author-avatar" loading="lazy">
              <div class="author-info">
                <div class="author-name">{{ testi.name || testi.author }}</div>
                <div class="author-role">{{ testi.role }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="slider-nav">
          <button class="slider-btn" id="prev-testi" aria-label="Previous testimonial" @click="prevTestimonial">
            <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button class="slider-btn" id="next-testi" aria-label="Next testimonial" @click="nextTestimonial">
            <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- =========================================
         CTA BANNER (Ohio Agency Style)
         ========================================= -->
    <section class="cta-banner container">
      <div class="cta-box flex flex-col items-center justify-center text-center">
        <div class="section-eyebrow mb-sm">
          <span class="eyebrow-num">06 //</span>
          <span class="eyebrow-text">START A COLLABORATION</span>
        </div>
        <h2>Let's Build Something <span class="title-serif text-accent">Extraordinary</span> Together</h2>
        <p class="text-muted max-w-md mt-sm">
          Siap mewujudkan ide video dan visual kreatif Anda menjadi karya berdaya jangkau tinggi yang memikat audiens?
        </p>
        <a href="#contact" class="btn cta-btn rounded-pill mt-md">
          Start a Project <span class="btn-arrow">↗</span>
        </a>
      </div>
    </section>
  </div>
</template>
