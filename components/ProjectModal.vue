<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useProjectModal } from '~/composables/useProjectModal'

const { isModalOpen, selectedProject, currentSlide, slides, closeModal, nextSlide, prevSlide, goToSlide } = useProjectModal()

const isVertical = computed(() => {
  if (!selectedProject.value) return false
  return selectedProject.value.aspectRatio === '9/16' || selectedProject.value.videoType === 'reel'
})

const isCarousel = computed(() => {
  if (!selectedProject.value) return false
  return selectedProject.value.isCarousel || (selectedProject.value.slides && selectedProject.value.slides.length > 1)
})

const isYouTube = computed(() => {
  return selectedProject.value?.videoType === 'youtube' && !!selectedProject.value?.youtubeId
})

const isLocalVideo = computed(() => {
  return selectedProject.value?.videoType === 'video' && !!selectedProject.value?.videoUrl
})

const isReel = computed(() => {
  return selectedProject.value?.videoType === 'reel' && !isLocalVideo.value && !isYouTube.value && !isCarousel.value
})

const isStaticDesign = computed(() => {
  return !isLocalVideo.value && !isYouTube.value && !isReel.value && !isCarousel.value
})

const mediaBadgeText = computed(() => {
  if (!selectedProject.value) return 'PREVIEW'
  if (isYouTube.value) return 'YOUTUBE 4K (16:9)'
  if (isLocalVideo.value) return isVertical.value ? 'VIDEO REEL (9:16)' : 'VIDEO PREVIEW (16:9)'
  if (isReel.value) return 'INSTAGRAM REEL (9:16)'
  if (isCarousel.value) return 'CAROUSEL SLIDER (3:4)'
  if (selectedProject.value.category === 'UI/UX Design') return 'UI/UX PREVIEW'
  return 'DESIGN SHOWCASE'
})

const platformButtonText = computed(() => {
  if (!selectedProject.value) return 'Lihat Postingan Klien'
  if (isCarousel.value) return 'Lihat Carousel di Instagram'
  if (isYouTube.value) return 'Tonton di YouTube'
  if (isReel.value || isLocalVideo.value) return 'Tonton di Instagram Reel'
  return 'Lihat di Instagram'
})

// Inquire WhatsApp
const openInquireWhatsApp = () => {
  if (!selectedProject.value) return
  const text = encodeURIComponent(`Halo Mohammad Ikhsan, saya tertarik untuk membuat projek serupa seperti "${selectedProject.value.title}". Bisakah kita diskusikan detailnya?`)
  window.open(`https://wa.me/6287754388856?text=${text}`, '_blank')
}

// Touch swipe for carousel
let touchStartX = 0
let touchEndX = 0

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX
}

const onTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX
  const diff = touchEndX - touchStartX
  if (Math.abs(diff) > 40 && isCarousel.value) {
    if (diff < 0) nextSlide()
    else prevSlide()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isModalOpen.value) return
  if (e.key === 'Escape') closeModal()
  if (isCarousel.value) {
    if (e.key === 'ArrowRight') nextSlide()
    if (e.key === 'ArrowLeft') prevSlide()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div 
    id="project-modal" 
    class="modal-overlay" 
    :class="{ active: isModalOpen && selectedProject }"
    role="dialog" 
    aria-modal="true" 
    :aria-hidden="!(isModalOpen && selectedProject)"
    @click.self="closeModal"
  >
    <div v-if="selectedProject" class="modal-container modal-project">
      <button class="modal-close" id="close-project-modal" aria-label="Close modal" @click="closeModal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Media Container -->
      <div 
        class="modal-media-wrapper" 
        id="modal-media-wrapper"
        :class="{
          'aspect-9-16': isVertical,
          'aspect-16-9': !isVertical && (isYouTube || isLocalVideo),
          'aspect-portrait': isCarousel,
          'aspect-image': isStaticDesign
        }"
      >
        <!-- 1. HTML5 Native Video Element -->
        <video 
          v-if="isLocalVideo"
          id="modal-project-video" 
          class="modal-video" 
          controls 
          autoplay 
          playsinline 
          preload="metadata"
          :src="selectedProject.videoUrl"
        ></video>

        <!-- 2. YouTube Iframe -->
        <iframe 
          v-else-if="isYouTube"
          id="modal-project-iframe" 
          class="modal-iframe" 
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          :src="`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeId}?autoplay=1&mute=0&rel=0`"
        ></iframe>

        <!-- 3. Reel Frame (Clean, zero external chrome) -->
        <a 
          v-else-if="isReel"
          id="modal-project-reel-link" 
          class="modal-reel-frame" 
          :href="selectedProject.link || '#'" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <img id="modal-reel-poster" :src="selectedProject.image" :alt="selectedProject.title" class="modal-reel-img">
          <div class="modal-reel-overlay">
            <div class="modal-reel-play-btn" aria-label="Play video">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
            </div>
            <div class="modal-reel-cta">
              <span class="modal-reel-cta-platform" id="modal-reel-cta-platform">Tonton di Instagram</span>
              <span class="modal-reel-cta-sub">Klik untuk tonton resolusi asli ↗</span>
            </div>
          </div>
        </a>

        <!-- 4. Multi-Slide Carousel for Social Posts & Designs -->
        <div 
          v-else-if="isCarousel"
          id="modal-carousel-slider" 
          class="modal-carousel-slider"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div class="carousel-track-container">
            <div 
              id="modal-carousel-track" 
              class="carousel-track"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="(slide, idx) in slides" 
                :key="idx" 
                class="carousel-slide"
              >
                <img :src="slide" :alt="`${selectedProject.title} - Slide ${idx + 1}`" class="carousel-slide-img" />
              </div>
            </div>
          </div>

          <button 
            v-if="slides.length > 1"
            type="button" 
            id="carousel-prev-btn" 
            class="carousel-nav-btn prev-btn" 
            aria-label="Slide sebelumnya"
            @click.stop="prevSlide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button 
            v-if="slides.length > 1"
            type="button" 
            id="carousel-next-btn" 
            class="carousel-nav-btn next-btn" 
            aria-label="Slide berikutnya"
            @click.stop="nextSlide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <div class="carousel-counter" id="carousel-counter">
            <span id="carousel-current-index">{{ currentSlide + 1 }}</span> / <span id="carousel-total-slides">{{ slides.length }}</span>
          </div>

          <div v-if="slides.length > 1" class="carousel-dots" id="carousel-dots">
            <button
              v-for="(_, idx) in slides"
              :key="idx"
              type="button"
              class="carousel-dot"
              :class="{ active: idx === currentSlide }"
              :aria-label="`Slide ${idx + 1}`"
              @click.stop="goToSlide(idx)"
            ></button>
          </div>
        </div>

        <!-- 5. High-Res Framed Static Image Preview -->
        <div v-else-if="isStaticDesign" id="modal-image-frame" class="modal-image-frame">
          <img id="modal-project-img" :src="selectedProject.image" :alt="selectedProject.title" class="modal-image">
        </div>

        <!-- Interactive Media Badge -->
        <div class="modal-media-badge" id="modal-media-badge">
          <span class="badge-dot"></span>
          <span id="modal-media-badge-text">{{ mediaBadgeText }}</span>
        </div>
      </div>

      <!-- Modal Body Content -->
      <div class="modal-body">
        <div class="modal-header-meta flex items-center justify-between gap-sm flex-wrap">
          <div class="modal-meta-left flex items-center gap-sm flex-wrap">
            <span id="modal-project-category" class="project-category text-accent">{{ selectedProject.category }}</span>
            <a 
              v-if="selectedProject.link" 
              id="modal-project-url-badge" 
              :href="selectedProject.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn-platform-badge btn-platform-instagram"
            >
              <span class="platform-badge-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </span>
              <span class="platform-badge-text">{{ isCarousel ? 'Lihat Carousel di IG' : 'Lihat di Instagram' }}</span>
              <svg class="external-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
          <span v-if="selectedProject.client" id="modal-project-client" class="project-client text-muted font-mono font-xs">
            Client: {{ selectedProject.client }}
          </span>
        </div>

        <h2 id="modal-project-title" class="modal-title mt-xs">{{ selectedProject.title }}</h2>

        <div v-if="selectedProject.tags" id="modal-project-tags" class="project-tags flex gap-sm flex-wrap mt-sm">
          <span v-for="t in selectedProject.tags" :key="t" class="project-tag-pill">{{ t }}</span>
        </div>

        <p id="modal-project-desc" class="modal-desc text-muted mt-md">{{ selectedProject.description }}</p>

        <!-- Project Specs Grid (Software, Format, Scope) -->
        <div v-if="selectedProject.specs" class="modal-specs-grid grid grid-cols-3 gap-sm mt-md" id="modal-specs-grid">
          <div class="spec-card">
            <span class="spec-label">Software</span>
            <span class="spec-value" id="spec-software">{{ selectedProject.specs.software || 'Adobe Suite' }}</span>
          </div>
          <div class="spec-card">
            <span class="spec-label">Format / Ratio</span>
            <span class="spec-value" id="spec-format">{{ selectedProject.specs.format || selectedProject.aspectRatio || 'Standard' }}</span>
          </div>
          <div class="spec-card">
            <span class="spec-label">Deliverable</span>
            <span class="spec-value" id="spec-scope">{{ selectedProject.specs.scope || 'Creative Direction' }}</span>
          </div>
        </div>

        <div class="modal-actions mt-lg flex items-center gap-md flex-wrap">
          <a 
            v-if="selectedProject.link" 
            id="modal-project-url" 
            :href="selectedProject.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary rounded-pill btn-platform-instagram"
          >
            <span>{{ platformButtonText }}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <button 
            type="button" 
            class="btn btn-secondary rounded-pill modal-contact-trigger"
            id="modal-inquire-btn"
            @click="openInquireWhatsApp"
          >
            Order Proyek Serupa ↗
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
