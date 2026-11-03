<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { 
  cinemaServices, 
  cinemaProjects, 
  statsDataCinema, 
  testimonialsDataCinema, 
  type Project 
} from '~/data/portfolio'
import { useProjectModal } from '~/composables/useProjectModal'

useSeoMeta({
  title: 'Cinema & Visual Media | SANMHMD - Mohammad Ikhsan',
  description: 'Spesialisasi video editing vertikal (Reels/TikTok), videografi sinematik 4K, aerial drone berizin, dan color grading filmis terkalibrasi.',
  ogTitle: 'Cinema & Visual Media | SANMHMD - Mohammad Ikhsan',
  ogDescription: 'Spesialisasi video editing vertikal (Reels/TikTok), videografi sinematik 4K, aerial drone berizin, dan color grading filmis terkalibrasi.',
  ogImage: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2'
})

const { openModal } = useProjectModal()

// --- Work Filters & Sliding Pill ---
const activeFilter = ref('All')
const filterConfigs = [
  { label: 'All Works', filter: 'All', key: '' },
  { label: 'Reels & Short Form', filter: 'Reels & Short Form', key: 'subCategory' },
  { label: 'Videography & Drone', filter: 'Videography & Drone', key: 'subCategory' },
  { label: 'Photography & Retouch', filter: 'Photography & Retouch', key: 'subCategory' }
]

const getFilterCount = (cfg: { filter: string; key: string }) => {
  if (cfg.filter === 'All') return cinemaProjects.length
  return cinemaProjects.filter((p: Project) => p.subCategory === cfg.filter).length
}

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return cinemaProjects
  return cinemaProjects.filter((p: Project) => p.subCategory === activeFilter.value)
})

const pillStyle = ref({
  width: '0px',
  height: '0px',
  transform: 'translate(0px, 0px)',
  opacity: '0'
})

const setFilter = (filter: string, e?: MouseEvent) => {
  activeFilter.value = filter
  nextTick(() => {
    const target = (e?.currentTarget as HTMLElement) || document.querySelector('.filter-btn.active') as HTMLElement
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
  const tag1 = project.category || 'Cinema Work'
  let tag2 = project.subCategory || (project.specs?.format ? project.specs.format.split(' ')[0] : (project.tags ? project.tags[0] : ''))
  if (tag2 && tag2.toLowerCase() === tag1.toLowerCase()) {
    tag2 = (project.tags && project.tags[1]) ? project.tags[1] : (project.tags && project.tags[0] ? project.tags[0] : '')
  }
  return { tag1, tag2 }
}

// --- Interactive Color Grading Split Slider ---
const scenes = {
  drone: {
    raw: '/images/grade-sans-drone-raw.webp',
    graded: '/images/grade-sans-drone-graded.webp'
  },
  court: {
    raw: '/images/grade-court-raw.webp',
    graded: '/images/grade-court-graded.webp'
  },
  urban: {
    raw: '/images/grade-urban-raw.webp',
    graded: '/images/grade-urban-graded.webp'
  }
}

const currentSceneKey = ref<'drone' | 'court' | 'urban'>('drone')
const splitPos = ref(50)
const stageRef = ref<HTMLElement | null>(null)
let isDragging = false

const setScene = (key: 'drone' | 'court' | 'urban') => {
  currentSceneKey.value = key
}

const updateSliderPos = (percent: number) => {
  const clamped = Math.max(0, Math.min(100, percent))
  splitPos.value = clamped
}

const handlePointerMove = (clientX: number) => {
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  if (rect.width <= 0) return
  const percent = ((clientX - rect.left) / rect.width) * 100
  updateSliderPos(percent)
}

const onMouseDown = (e: MouseEvent) => {
  isDragging = true
  handlePointerMove(e.clientX)
}

const onTouchStart = (e: TouchEvent) => {
  if (e.touches.length > 0) {
    isDragging = true
    handlePointerMove(e.touches[0].clientX)
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    updateSliderPos(splitPos.value - 4)
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    updateSliderPos(splitPos.value + 4)
  }
}

// --- Testimonials Slider ---
const currentTestiIdx = ref(0)
const nextTestimonial = () => {
  currentTestiIdx.value = (currentTestiIdx.value + 1) % testimonialsDataCinema.length
}
const prevTestimonial = () => {
  currentTestiIdx.value = (currentTestiIdx.value - 1 + testimonialsDataCinema.length) % testimonialsDataCinema.length
}

// --- Contact Form ---
const contactName = ref('')
const contactEmail = ref('')
const contactService = ref('Video Editing (Reels/TikTok/YouTube)')
const contactMsg = ref('')

const handleContactSubmit = (e: Event) => {
  e.preventDefault()
  const text = encodeURIComponent(
    `Halo Mohammad Ikhsan,\nSaya: ${contactName.value}\nKontak: ${contactEmail.value}\nLayanan: ${contactService.value}\n\nPesan:\n${contactMsg.value}`
  )
  window.open(`https://wa.me/6281807882493?text=${text}`, '_blank')
}

onMounted(() => {
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return
    handlePointerMove(e.clientX)
  })
  window.addEventListener('mouseup', () => {
    isDragging = false
  })
  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length === 0) return
    handlePointerMove(e.touches[0].clientX)
  }, { passive: true })
  window.addEventListener('touchend', () => {
    isDragging = false
  })

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
</script>

<template>
  <div>
    <!-- =========================================
         CINEMA HERO SECTION
         ========================================= -->
    <section class="hero hero-subpage" id="hero">
      <div class="container hero-container hero-grid-subpage">
        <div class="hero-subpage-content reveal">
          <div class="track-badge-header">
            <span class="track-pill cinema-pill">TRACK 01 // AUDIO-VISUAL</span>
            <span class="track-status"><span class="badge-dot"></span> Available for Shoot &amp; Post-Production</span>
          </div>

          <h1 class="hero-title mt-sm">
            Rhythm.<br>
            Motion.<br>
            <span class="title-serif text-accent">Cinematic Depth.</span>
          </h1>

          <p class="hero-sublead text-muted max-w-lg mt-sm">
            Mendedikasikan diri pada seni visual bergerak — dari ritme video editing vertikal yang memikat
            atensi, pengambilan gambar drone 4K bersudut pandang sinematik, hingga tata warna filmis berkarakter.
          </p>

          <div class="hero-actions flex items-center gap-md mt-md">
            <a href="#work" class="btn btn-primary rounded-pill">
              <span class="btn-circle-icon">↗</span> Explore Cinema Works
            </a>
            <NuxtLink to="/design" class="btn btn-secondary rounded-pill">
              Switch to Graphic Design →
            </NuxtLink>
          </div>

          <!-- Production Badges -->
          <div class="production-pills-row flex flex-wrap gap-xs mt-lg">
            <span class="tech-badge">4K Ultra HD</span>
            <span class="tech-badge">9:16 Vertical Reels</span>
            <span class="tech-badge">Drone Certified</span>
            <span class="tech-badge">Colorist</span>
            <span class="tech-badge">Sound Design</span>
          </div>
        </div>

        <!-- Production Visual Frame -->
        <div class="hero-subpage-visual reveal reveal-delay-2">
          <div class="subpage-visual-card rounded-card" @click="openModal(2)" role="button" tabindex="0"
            title="Klik untuk putar showreel 4K Sans Drone" style="cursor: pointer;">
            <div class="visual-card-glow cinema-glow"></div>
            <img src="/images/project-sans-drone.webp" alt="Elevating Your Perspective - SANS DRONE" class="subpage-hero-img">
            <div class="subpage-visual-overlay">
              <div class="playback-indicator">
                <span class="rec-dot"></span> REC · 24FPS · 4K UHD
              </div>
              <div class="footage-meta">
                <span class="footage-title">Elevating Your Perspective</span>
                <span class="footage-sub">SANS DRONE · Aerial Cinematics (Klik untuk putar ↗)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         PRODUCTION ARSENAL & WORKFLOW
         ========================================= -->
    <section id="arsenal" class="container arsenal-section">
      <div class="section-header-split reveal">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">PRODUCTION ARSENAL &amp; WORKFLOW</span>
          </div>
          <h2 class="section-title">Tools of <span class="title-serif text-accent">The Cinema Craft</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Dipersenjatai perangkat lunak industri standar dan alur kerja teruji untuk menjamin hasil render
            berkualitas broadcast dan media sosial premium.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mt-lg arsenal-grid">
        <div class="arsenal-card rounded-card bg-card reveal">
          <img src="/images/logo-premiere.webp" alt="Adobe Premiere Pro" class="arsenal-logo" loading="lazy">
          <h3 class="arsenal-title">Adobe Premiere Pro</h3>
          <p class="arsenal-desc text-muted">Mastering timeline, multi-cam editing, audio leveling, dan dynamic linking render.</p>
        </div>
        <div class="arsenal-card rounded-card bg-card reveal reveal-delay-1">
          <img src="/images/logo-capcut.webp" alt="CapCut Pro" class="arsenal-logo" loading="lazy">
          <h3 class="arsenal-title">CapCut Pro</h3>
          <p class="arsenal-desc text-muted">Optimasi ritme video vertikal berkecepatan tinggi, auto-captions dinamis, dan tren media sosial.</p>
        </div>
        <div class="arsenal-card rounded-card bg-card reveal reveal-delay-2">
          <div class="arsenal-icon-box">
            <svg class="arsenal-svg" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="#14171C" />
              <path d="M24 10c-3.5 0-6 3-4.5 6.5l3.5 7.5 3.5-7.5c1.5-3.5-1-6.5-4.5-6.5z" fill="#FF3850" />
              <path d="M12 31c2 3 5.5 3.5 8 1.5l7-4.5-8-2c-3.8-1-6.5 1.5-7 5z" fill="#00DF73" />
              <path d="M36 31c-2 3-5.5 3.5-8 1.5l-7-4.5 8-2c3.8-1 6.5 1.5 7 5z" fill="#00A6FF" />
            </svg>
          </div>
          <h3 class="arsenal-title">DaVinci Resolve</h3>
          <p class="arsenal-desc text-muted">Node-based color grading, color space transform, LUT mapping, dan film grain emulation.</p>
        </div>
        <div class="arsenal-card rounded-card bg-card reveal reveal-delay-3">
          <img src="/images/logo-photoshop.png" alt="Adobe Photoshop" class="arsenal-logo" loading="lazy">
          <h3 class="arsenal-title">Adobe Photoshop</h3>
          <p class="arsenal-desc text-muted">High-end photo manipulation, object removal, dan cinematic poster key visual.</p>
        </div>
      </div>
    </section>

    <!-- =========================================
         CINEMA SERVICES
         ========================================= -->
    <section id="services" class="container">
      <div class="section-header-split reveal">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">AUDIO-VISUAL REPERTOIRE</span>
          </div>
          <h2 class="section-title">Cinema &amp; Media <span class="title-serif text-accent">Services</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Spesialisasi produksi visual bergerak — dari video pendek vertikal (Reels/TikTok), videografi udara sinematik, hingga color retouching filmis.
          </p>
        </div>
      </div>

      <div class="services-grid-sekeco mt-lg">
        <a 
          v-for="(service, i) in cinemaServices" 
          :key="service.id"
          :href="service.link.startsWith('#') ? service.link : `#${service.link.split('#')[1] || 'work'}`"
          class="service-card-sekeco spotlight-card reveal rounded-card group" 
          :class="`reveal-delay-${(i % 3) + 1}`"
          :data-color="service.color || 'cyan'"
        >
          <div class="service-badge-icon" :class="`color-${service.color || 'cyan'}`" aria-hidden="true" v-html="service.icon"></div>
          <div class="service-body">
            <h3 class="service-heading">{{ service.title }}</h3>
            <p class="service-desc text-muted">{{ service.description }}</p>
          </div>
        </a>
      </div>
    </section>

    <!-- =========================================
         INTERACTIVE COLOR GRADING & RETOUCHING STUDIO
         ========================================= -->
    <section id="color-grading" class="container color-grading-section">
      <div class="section-header-split reveal mb-lg">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">COLORIST &amp; FINISHING WORKFLOW</span>
          </div>
          <h2 class="section-title">Color Grading &amp; <span class="title-serif text-accent">Film Look</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Mentransformasikan rekaman flat (RAW / D-Log / S-Log3) menjadi visual berkarakter sinematik — dengan dynamic range seimbang, kontras filmis, dan skin-tone natural yang presisi.
          </p>
        </div>
      </div>

      <!-- Scene Switcher Tabs -->
      <div class="grading-scene-selector flex gap-xs flex-wrap mb-md reveal">
        <button 
          class="grading-tab-btn" 
          :class="{ active: currentSceneKey === 'drone' }" 
          type="button"
          @click="setScene('drone')"
        >
          <span class="tab-indicator"></span> 01 · Aerial Landscape (DJI D-Log)
        </button>
        <button 
          class="grading-tab-btn" 
          :class="{ active: currentSceneKey === 'court' }" 
          type="button"
          @click="setScene('court')"
        >
          <span class="tab-indicator"></span> 02 · Documentary Mood (Warm Cinematic)
        </button>
        <button 
          class="grading-tab-btn" 
          :class="{ active: currentSceneKey === 'urban' }" 
          type="button"
          @click="setScene('urban')"
        >
          <span class="tab-indicator"></span> 03 · Urban Night (Cyberpunk Contrast)
        </button>
      </div>

      <!-- Interactive Comparison Split Stage -->
      <div 
        class="comparison-stage spotlight-card rounded-card reveal" 
        id="comparison-stage" 
        ref="stageRef"
        :style="{ '--split-pos': `${splitPos}%` }"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
      >
        <!-- Graded View (Bottom / Base Layer) -->
        <div class="comparison-layer comparison-after">
          <img :src="scenes[currentSceneKey].graded" alt="Final Color Graded" id="comparison-img-after" class="comparison-img">
          <div class="comparison-badge badge-after">
            <span class="badge-dot dot-graded"></span> REC.709 · FINAL FILM LOOK
          </div>
        </div>

        <!-- Raw / Log View (Top / Clipped Layer) -->
        <div class="comparison-layer comparison-before" id="comparison-before-layer">
          <img :src="scenes[currentSceneKey].raw" alt="Raw Flat Log Profile" id="comparison-img-before" class="comparison-img">
          <div class="comparison-badge badge-before">
            <span class="badge-dot dot-raw"></span> RAW / FLAT LOG PROFILE
          </div>
        </div>

        <!-- Draggable Divider & Thumb -->
        <div 
          class="comparison-slider-handle" 
          id="comparison-slider-handle" 
          aria-label="Geser untuk membandingkan grading" 
          role="slider" 
          :aria-valuenow="Math.round(splitPos)" 
          aria-valuemin="0" 
          aria-valuemax="100" 
          tabindex="0"
          @keydown="handleKeydown"
        >
          <div class="handle-line"></div>
          <div class="handle-thumb">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <div class="handle-line"></div>
        </div>
      </div>

      <div class="comparison-footer-hint flex items-center justify-between text-muted font-mono font-xs mt-sm reveal">
        <span>◀ RAW / Flat LOG</span>
        <span class="text-accent font-semibold">Tarik garis pemisah atau geser kursor untuk inspeksi</span>
        <span>Graded Film Look ▶</span>
      </div>
    </section>

    <!-- =========================================
         CINEMA WORKS WITH SLIDING PILL FILTER
         ========================================= -->
    <section id="work" class="container">
      <div class="section-header-split reveal mt-xl mb-lg">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">CINEMATIC SHOWCASE</span>
          </div>
          <h2 class="section-title">Cinema &amp; Video <span class="title-serif text-accent">Repertoire</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Rangkaian karya videografi komersial, liputan drone 4K, fashion reels beritme cepat, dan foto bernuansa sinematik.
          </p>
        </div>
      </div>

      <!-- Filters with Sliding Pill -->
      <div class="project-filters flex gap-sm flex-wrap justify-start mb-lg" id="project-filters">
        <span class="filter-sliding-pill" id="filter-sliding-pill" :style="pillStyle" aria-hidden="true"></span>
        <button 
          v-for="cfg in filterConfigs" 
          :key="cfg.filter"
          class="filter-btn"
          :class="{ active: activeFilter === cfg.filter }"
          :data-filter="cfg.filter"
          @click="setFilter(cfg.filter, $event)"
        >
          {{ cfg.label }} <span class="filter-count">{{ getFilterCount(cfg) }}</span>
        </button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-lg projects-grid" id="projects-container">
        <div 
          v-for="(project, i) in filteredProjects" 
          :key="project.id"
          class="project-card spotlight-card reveal rounded-card group"
          :class="`reveal-delay-${(i % 4) + 1}`"
          :data-id="project.id"
          @click="openModal(project)"
          style="cursor: pointer;"
        >
          <!-- Top Row Tags -->
          <div class="project-card-tags">
            <span class="project-tag-pill">{{ getProjectTags(project).tag1 }}</span>
            <span v-if="getProjectTags(project).tag2" class="project-tag-pill">{{ getProjectTags(project).tag2 }}</span>
          </div>

          <!-- Split Body: Left Info, Right Inset Media -->
          <div class="project-card-inner">
            <div class="project-card-content">
              <h3 class="project-title">
                <span>{{ project.title }}</span>
                <span class="project-title-arrow" aria-hidden="true">↗</span>
              </h3>
              <p class="project-short-desc text-muted">{{ project.description }}</p>
            </div>
            <div class="project-card-media" v-if="project.image">
              <img :src="project.image" :alt="project.title" class="project-image" loading="lazy" onerror="this.style.opacity='0';">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         CINEMA IMPACT SECTION
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
            Konsistensi kualitas sinematik, ketepatan tenggat waktu, dan kepuasan klien dalam setiap produksi video.
          </p>
        </div>
      </div>

      <div class="impact-grid border-t border-b" style="border-top: 1px solid var(--border-default); border-bottom: 1px solid var(--border-default); padding-block: 60px;">
        <div v-for="stat in statsDataCinema" :key="stat.label" class="stat-item reveal">
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
            Apa kata para brand owner dan produser komersial tentang kolaborasi produksi video bersama Mohammad Ikhsan.
          </p>
        </div>
      </div>

      <div class="testimonial-slider reveal reveal-delay-2">
        <div class="testimonial-track" id="testimonial-track" :style="{ transform: `translateX(-${currentTestiIdx * 100}%)`, transition: 'transform 0.5s ease-in-out' }">
          <div v-for="testi in testimonialsDataCinema" :key="testi.id" class="testimonial-card">
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
         CTA BANNER
         ========================================= -->
    <section class="cta-banner container">
      <div class="cta-box flex flex-col items-center justify-center text-center">
        <div class="section-eyebrow mb-sm">
          <span class="eyebrow-text">START A PRODUCTION</span>
        </div>
        <h2>Ready to Film or Edit Your <span class="title-serif text-accent">Next Masterpiece?</span></h2>
        <p class="text-muted max-w-md mt-sm">
          Mulai dari sesi pengambilan gambar video sinematik hingga pengolahan video pendek ritmis yang siap melesat di media sosial.
        </p>
        <div class="flex items-center justify-center gap-sm flex-wrap mt-md">
          <a href="#contact" class="btn cta-btn rounded-pill">
            Book Cinema Project <span class="btn-arrow">↗</span>
          </a>
          <a href="https://wa.me/6281807882493?text=Halo%20Ikhsan,%20boleh%20minta%20Rate%20Card%20dan%20daftar%20paket%20jasa%20video%20terbaru?"
            target="_blank" rel="noopener noreferrer" class="btn btn-secondary rounded-pill">
            Request Rate Card (PDF) ↗
          </a>
        </div>
      </div>
    </section>

    <!-- =========================================
         CONTACT SECTION
         ========================================= -->
    <section id="contact" class="container contact-section">
      <div class="contact-card rounded-card bg-card">
        <div class="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-xl">
          <div class="contact-info">
            <div class="section-eyebrow mb-xs">
              <span class="eyebrow-text">GET IN TOUCH // CINEMA &amp; MEDIA</span>
            </div>
            <h2 class="contact-title">Let's Discuss Your Video &amp; Photo Production</h2>
            <p class="contact-desc text-muted mt-sm">
              Konsultasikan konsep video, rencana syuting, atau kebutuhan editing berkala untuk brand dan bisnis Anda.
            </p>
            <div class="contact-meta-list mt-md">
              <div class="contact-meta-item flex items-center gap-sm">
                <span class="meta-icon">📍</span>
                <span class="text-muted">Yogyakarta &amp; Jakarta, Indonesia</span>
              </div>
              <div class="contact-meta-item flex items-center gap-sm mt-xs">
                <span class="meta-icon">✉️</span>
                <a href="mailto:iechantwiranata@gmail.com" class="text-accent">iechantwiranata@gmail.com</a>
              </div>
              <div class="contact-meta-item flex items-center gap-sm mt-xs">
                <span class="meta-icon">📱</span>
                <a href="https://www.instagram.com/san_mhmd17/" target="_blank" rel="noopener" class="text-muted">@san_mhmd17</a>
              </div>
            </div>
          </div>
          <form id="cinema-contact-form" class="contact-form flex flex-col gap-sm" @submit="handleContactSubmit">
            <div class="form-group">
              <label for="cinema-name" class="form-label font-mono font-xs">Nama Lengkap</label>
              <input type="text" id="cinema-name" name="name" v-model="contactName" class="form-input" placeholder="Nama Anda atau Perusahaan" required>
            </div>
            <div class="form-group">
              <label for="cinema-email" class="form-label font-mono font-xs">Email / No. WhatsApp</label>
              <input type="text" id="cinema-email" name="email" v-model="contactEmail" class="form-input" placeholder="email@anda.com atau 0812xxxx" required>
            </div>
            <div class="form-group">
              <label for="cinema-service" class="form-label font-mono font-xs">Layanan yang Dibutuhkan</label>
              <select id="cinema-service" name="service" v-model="contactService" class="form-input">
                <option>Video Editing (Reels/TikTok/YouTube)</option>
                <option>Commercial Videography</option>
                <option>Drone Pilot &amp; Aerial Cinematics</option>
                <option>Photography &amp; Color Retouching</option>
                <option>Full Audio-Visual Package</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cinema-msg" class="form-label font-mono font-xs">Detail Proyek</label>
              <textarea id="cinema-msg" name="message" v-model="contactMsg" rows="4" class="form-input" placeholder="Ceritakan konsep video atau kebutuhan syuting Anda..." required></textarea>
            </div>
            <button type="submit" id="cinema-submit-btn" class="btn btn-primary rounded-pill mt-xs">
              <span>Kirim Pesan Produksi ↗</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
