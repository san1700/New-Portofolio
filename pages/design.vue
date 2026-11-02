<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { 
  designServices, 
  designProjects, 
  statsDataDesign, 
  testimonialsDataDesign, 
  type Project 
} from '~/data/portfolio'
import { useProjectModal } from '~/composables/useProjectModal'

useSeoMeta({
  title: 'Graphic & UI/UX Design | SANMHMD - Mohammad Ikhsan',
  description: 'Desain identitas brand, perancangan antarmuka digital (UI/UX) web & mobile, carousel edukatif media sosial, dan poster tipografi modern.',
  ogTitle: 'Graphic & UI/UX Design | SANMHMD - Mohammad Ikhsan',
  ogDescription: 'Desain identitas brand, perancangan antarmuka digital (UI/UX) web & mobile, carousel edukatif media sosial, dan poster tipografi modern.',
  ogImage: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2'
})

const { openModal } = useProjectModal()

// --- Work Filters & Sliding Pill ---
const activeFilter = ref('All')
const filterConfigs = [
  { label: 'All Designs', filter: 'All', key: '' },
  { label: 'UI/UX Design', filter: 'UI/UX Design', key: 'category' },
  { label: 'Brand Identity', filter: 'Brand Identity', key: 'category' },
  { label: 'Social Carousel', filter: 'Social Carousel', key: 'category' },
  { label: 'Poster Design', filter: 'Poster Design', key: 'category' }
]

const getFilterCount = (cfg: { filter: string; key: string }) => {
  if (cfg.filter === 'All') return designProjects.length
  return designProjects.filter((p: Project) => p.category === cfg.filter).length
}

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return designProjects
  return designProjects.filter((p: Project) => p.category === activeFilter.value)
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
  const tag1 = project.category || 'Design Work'
  let tag2 = project.subCategory || (project.specs?.format ? project.specs.format.split(' ')[0] : (project.tags ? project.tags[0] : ''))
  if (tag2 && tag2.toLowerCase() === tag1.toLowerCase()) {
    tag2 = (project.tags && project.tags[1]) ? project.tags[1] : (project.tags && project.tags[0] ? project.tags[0] : '')
  }
  return { tag1, tag2 }
}

// --- Testimonials Slider ---
const currentTestiIdx = ref(0)
const nextTestimonial = () => {
  currentTestiIdx.value = (currentTestiIdx.value + 1) % testimonialsDataDesign.length
}
const prevTestimonial = () => {
  currentTestiIdx.value = (currentTestiIdx.value - 1 + testimonialsDataDesign.length) % testimonialsDataDesign.length
}

// --- Contact Form ---
const contactName = ref('')
const contactEmail = ref('')
const contactService = ref('UI/UX Design (Web & Mobile App)')
const contactMsg = ref('')

const handleContactSubmit = (e: Event) => {
  e.preventDefault()
  const text = encodeURIComponent(
    `Halo Mohammad Ikhsan,\nSaya: ${contactName.value}\nKontak: ${contactEmail.value}\nKategori: ${contactService.value}\n\nPesan:\n${contactMsg.value}`
  )
  window.open(`https://wa.me/6281807882493?text=${text}`, '_blank')
}

onMounted(() => {
  nextTick(() => {
    updatePillPosition()
  })
  window.addEventListener('resize', () => updatePillPosition(), { passive: true })
})
</script>

<template>
  <div>
    <!-- =========================================
         DESIGN HERO SECTION
         ========================================= -->
    <section class="hero hero-subpage" id="hero">
      <div class="container hero-container hero-grid-subpage">
        <div class="hero-subpage-content reveal">
          <div class="track-badge-header">
            <span class="track-pill design-pill">TRACK 02 // COMMUNICATION &amp; PRODUCT</span>
            <span class="track-status"><span class="badge-dot"></span> Available for Brand &amp; UI/UX</span>
          </div>

          <h1 class="hero-title mt-sm">
            Clarity.<br>
            Systems.<br>
            <span class="title-serif text-accent">Timeless Craft.</span>
          </h1>

          <p class="hero-sublead text-muted max-w-lg mt-sm">
            Membangun komunikasi visual yang jernih dan berpengaruh — dari perancangan antarmuka digital (UI/UX) yang ramah pengguna, sistem identitas brand autentik, hingga poster dan carousel media sosial berkonversi tinggi.
          </p>

          <div class="hero-actions flex items-center gap-md mt-md">
            <a href="#work" class="btn btn-primary rounded-pill">
              <span class="btn-circle-icon">↗</span> Explore Design Works
            </a>
            <NuxtLink to="/cinema" class="btn btn-secondary rounded-pill">
              ← Switch to Cinema Track
            </NuxtLink>
          </div>

          <!-- Design Badges -->
          <div class="production-pills-row flex flex-wrap gap-xs mt-lg">
            <span class="tech-badge">UI/UX Design</span>
            <span class="tech-badge">Brand Identity</span>
            <span class="tech-badge">Design Systems</span>
            <span class="tech-badge">Social Carousel</span>
            <span class="tech-badge">Poster Typography</span>
          </div>
        </div>

        <!-- Design Visual Showcase -->
        <div class="hero-subpage-visual reveal reveal-delay-2">
          <div class="subpage-visual-card rounded-card" @click="openModal(111)" role="button" tabindex="0" title="Klik untuk lihat detail Desain Poster Event DPP IMABA" style="cursor: pointer;">
            <div class="visual-card-glow design-glow"></div>
            <img src="/images/project-poster-imaba.jpg?v=2" alt="Poster Desain Event DPP IMABA" class="subpage-hero-img">
            <div class="subpage-visual-overlay">
              <div class="playback-indicator">
                <span class="rec-dot" style="background: #10B981;"></span> OFFICIAL POSTER &amp; CAMPAIGN
              </div>
              <div class="footage-meta">
                <span class="footage-title">Dokumentasi Event &amp; Poster DPP IMABA</span>
                <span class="footage-sub">Key Visual, Typography Hierarchy &amp; Social Campaign (Klik untuk buka detail ↗)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================
         DESIGN STACK & PRINCIPLES
         ========================================= -->
    <section id="arsenal" class="container arsenal-section">
      <div class="section-header-split reveal">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">CREATIVE SUITE &amp; TOOLKIT</span>
          </div>
          <h2 class="section-title">Design <span class="title-serif text-accent">Stack &amp; Principles</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Menggabungkan perangkat lunak desain vektor presisi tinggi dan pemikiran arsitektur informasi untuk menghasilkan aset visual yang konsisten dan berdampak.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-md mt-lg arsenal-grid">
        <div class="arsenal-card rounded-card bg-card reveal">
          <img src="/images/logo-photoshop.png" alt="Adobe Photoshop" class="arsenal-logo" loading="lazy">
          <h3 class="arsenal-title">Adobe Photoshop</h3>
          <p class="arsenal-desc text-muted">Manipulasi grafis, compositing poster, tekstur artistik, dan mockup presentasi berkelas.</p>
        </div>
        <div class="arsenal-card rounded-card bg-card reveal reveal-delay-1">
          <div class="arsenal-icon-box">
            <svg class="arsenal-svg" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="#1C1C1E" />
              <g transform="translate(14, 10)">
                <path d="M0 0h5a5 5 0 0 1 0 10H0V0z" fill="#FF7262" transform="translate(5, 0)" />
                <path d="M5 0a5 5 0 0 0-5 5 5 5 0 0 0 5 5h5V0H5z" fill="#F24E1E" />
                <path d="M5 10a5 5 0 0 0-5 5 5 5 0 0 0 5 5h5v-10H5z" fill="#A259FF" />
                <circle cx="15" cy="15" r="5" fill="#1ABCFE" />
                <path d="M5 20a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5v-5H5z" fill="#0ACF83" />
              </g>
            </svg>
          </div>
          <h3 class="arsenal-title">Figma</h3>
          <p class="arsenal-desc text-muted">Perancangan UI/UX responsif, design token, wireframe prototipe, dan atomic design system.</p>
        </div>
        <div class="arsenal-card rounded-card bg-card reveal reveal-delay-2">
          <div class="arsenal-icon-box">
            <svg class="arsenal-svg" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="#330000" />
              <path d="M14 32L18.8 17h3.4L27 32h-3.2l-1.3-4.2h-4.8L16.4 32H14zm4.4-7h3.3l-1.6-5.8h-.1l-1.6 5.8z" fill="#FF9A00" />
              <path d="M29.5 20h3.2V32h-3.2V20zm0-4.5a1.8 1.8 0 1 1 3.6 0 1.8 1.8 0 0 1-3.6 0z" fill="#FF9A00" />
            </svg>
          </div>
          <h3 class="arsenal-title">Adobe Illustrator</h3>
          <p class="arsenal-desc text-muted">Pembuatan logo vektor geometris, tipografi kustom, ikonografi tajam, dan aset siap cetak.</p>
        </div>
        <div class="arsenal-card rounded-card bg-card reveal reveal-delay-3">
          <img src="/images/logo-coreldraw.png" alt="CorelDraw" class="arsenal-logo" loading="lazy">
          <h3 class="arsenal-title">CorelDraw</h3>
          <p class="arsenal-desc text-muted">Layout percetakan komersial berskala besar, banner, dan presisi warna separasi CMYK.</p>
        </div>
      </div>
    </section>

    <!-- =========================================
         DESIGN SERVICES
         ========================================= -->
    <section id="services" class="container">
      <div class="section-header-split reveal">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">COMMUNICATION &amp; SYSTEMS</span>
          </div>
          <h2 class="section-title">Graphic &amp; UI/UX <span class="title-serif text-accent">Services</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Perancangan visual berkarakter kuat — dari antarmuka digital (UI/UX) web &amp; mobile, identitas visual brand, carousel edukatif, hingga poster tipografi.
          </p>
        </div>
      </div>

      <div class="services-grid-sekeco mt-lg">
        <a 
          v-for="(service, i) in designServices" 
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
         DESIGN WORKS WITH SLIDING PILL FILTER
         ========================================= -->
    <section id="work" class="container">
      <div class="section-header-split reveal mt-xl mb-lg">
        <div class="section-header-left">
          <div class="section-eyebrow">
            <span class="eyebrow-text">DESIGN SHOWCASE</span>
          </div>
          <h2 class="section-title">Graphic &amp; Product <span class="title-serif text-accent">Showcase</span></h2>
        </div>
        <div class="section-header-right">
          <p class="section-lead-desc text-muted">
            Studi kasus antarmuka aplikasi digital, sistem identitas visual brand, carousel edukatif berslide banyak, dan poster modern.
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
         DESIGN IMPACT SECTION
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
            Presisi estetika visual, konsistensi pedoman desain, dan kepuasan klien dalam setiap eksekusi grafis.
          </p>
        </div>
      </div>

      <div class="impact-grid border-t border-b" style="border-top: 1px solid var(--border-default); border-bottom: 1px solid var(--border-default); padding-block: 60px;">
        <div v-for="stat in statsDataDesign" :key="stat.label" class="stat-item reveal">
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
            Tanggapan jujur dari para pendiri startup, organisasi, dan klien korporasi mengenai hasil kerja desain Mohammad Ikhsan.
          </p>
        </div>
      </div>

      <div class="testimonial-slider reveal reveal-delay-2">
        <div class="testimonial-track" id="testimonial-track" :style="{ transform: `translateX(-${currentTestiIdx * 100}%)`, transition: 'transform 0.5s ease-in-out' }">
          <div v-for="testi in testimonialsDataDesign" :key="testi.id" class="testimonial-card">
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
          <span class="eyebrow-text">START A PROJECT</span>
        </div>
        <h2>Ready to Build Your Brand or <span class="title-serif text-accent">Product Experience?</span></h2>
        <p class="text-muted max-w-md mt-sm">
          Mari wujudkan identitas visual berkelas dan antarmuka produk digital yang berkesan bagi pengguna Anda.
        </p>
        <div class="flex items-center justify-center gap-sm flex-wrap mt-md">
          <a href="#contact" class="btn cta-btn rounded-pill">
            Start Design Project <span class="btn-arrow">↗</span>
          </a>
          <a href="https://wa.me/6281807882493?text=Halo%20Ikhsan,%20boleh%20minta%20Rate%20Card%20dan%20daftar%20paket%20jasa%20desain%20terbaru?"
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
        <div class="contact-grid grid grid-cols-2 gap-xl">
          <div class="contact-info">
            <div class="section-eyebrow mb-xs">
              <span class="eyebrow-text">GET IN TOUCH // GRAPHIC &amp; UI/UX</span>
            </div>
            <h2 class="contact-title">Let's Craft Your Brand &amp; Digital Interfaces</h2>
            <p class="contact-desc text-muted mt-sm">
              Diskusikan brief desain poster, rencana peluncuran branding logo baru, template carousel, atau studi kasus UI/UX bersama saya.
            </p>
            <div class="contact-meta-list mt-md">
              <div class="contact-meta-item flex items-center gap-sm">
                <span class="meta-icon">📍</span>
                <span class="text-muted">Indonesia (Remote / Hybrid)</span>
              </div>
              <div class="contact-meta-item flex items-center gap-sm mt-xs">
                <span class="meta-icon">✉️</span>
                <a href="mailto:iechantwiranata@gmail.com" class="text-accent">iechantwiranata@gmail.com</a>
              </div>
              <div class="contact-meta-item flex items-center gap-sm mt-xs">
                <span class="meta-icon">🎨</span>
                <a href="https://www.instagram.com/san_mhmd17/" target="_blank" rel="noopener" class="text-muted">@san_mhmd17</a>
              </div>
            </div>
          </div>
          <form id="design-contact-form" class="contact-form flex flex-col gap-sm" @submit="handleContactSubmit">
            <div class="form-group">
              <label for="design-name" class="form-label font-mono font-xs">Nama Lengkap</label>
              <input type="text" id="design-name" name="name" v-model="contactName" class="form-input" placeholder="Nama Anda atau Brand" required>
            </div>
            <div class="form-group">
              <label for="design-email" class="form-label font-mono font-xs">Email / No. WhatsApp</label>
              <input type="text" id="design-email" name="email" v-model="contactEmail" class="form-input" placeholder="email@anda.com atau 0812xxxx" required>
            </div>
            <div class="form-group">
              <label for="design-service" class="form-label font-mono font-xs">Kategori Desain</label>
              <select id="design-service" name="service" v-model="contactService" class="form-input">
                <option>UI/UX Design (Web &amp; Mobile App)</option>
                <option>Brand Identity &amp; Logo System</option>
                <option>Social Media Carousel Series</option>
                <option>Poster &amp; Editorial Typography</option>
                <option>Complete Visual Package</option>
              </select>
            </div>
            <div class="form-group">
              <label for="design-msg" class="form-label font-mono font-xs">Brief Desain</label>
              <textarea id="design-msg" name="message" v-model="contactMsg" rows="4" class="form-input" placeholder="Jelaskan kebutuhan desain, tujuan brand, atau referensi visual Anda..." required></textarea>
            </div>
            <button type="submit" id="design-submit-btn" class="btn btn-primary rounded-pill mt-xs">
              <span>Kirim Pesan Desain ↗</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
