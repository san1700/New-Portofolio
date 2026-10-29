<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useProjectModal } from '~/composables/useProjectModal'

const { isModalOpen, selectedProject, currentSlide, slides, closeModal, nextSlide, prevSlide, goToSlide } = useProjectModal()

const isVertical = computed(() => {
  if (!selectedProject.value) return false
  return selectedProject.value.aspectRatio === '9/16' || selectedProject.value.videoType === 'reel'
})

const isCarousel = computed(() => {
  return selectedProject.value?.isCarousel || (selectedProject.value?.slides && selectedProject.value.slides.length > 1)
})

const isVideo = computed(() => {
  return selectedProject.value?.videoType === 'video' || selectedProject.value?.videoType === 'reel'
})

const isYouTube = computed(() => {
  return selectedProject.value?.videoType === 'youtube' && selectedProject.value?.youtubeId
})

const isStaticImage = computed(() => {
  return !isVideo.value && !isYouTube.value && !isCarousel.value
})

const handleKeydown = (e: KeyboardEvent) => {
  if (!isModalOpen.value) return
  if (e.key === 'Escape') closeModal()
  if (isCarousel.value) {
    if (e.key === 'ArrowRight') nextSlide()
    if (e.key === 'ArrowLeft') prevSlide()
  }
}

// Touch swipe handling for carousel
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

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 backdrop-blur-none"
      enter-to-class="opacity-100 backdrop-blur-xl"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 backdrop-blur-xl"
      leave-to-class="opacity-0 backdrop-blur-none"
    >
      <div 
        v-if="isModalOpen && selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
        @click.self="closeModal"
      >
        <!-- Modal Card Dialog -->
        <div 
          class="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-obsidian-900 border border-white/10 shadow-2xl shadow-black overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          role="dialog"
          aria-modal="true"
        >
          <!-- Close Button Top-Right -->
          <button 
            type="button" 
            @click="closeModal"
            class="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/10 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            aria-label="Tutup modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <!-- Modal Scrollable Content Container -->
          <div class="flex-1 overflow-y-auto">
            
            <!-- MEDIA STAGE -->
            <div 
              class="relative bg-black flex items-center justify-center overflow-hidden"
              :class="isVertical ? 'max-h-[580px] py-4' : 'max-h-[520px] aspect-video w-full'"
            >
              <!-- 1. YouTube Iframe Embed -->
              <iframe 
                v-if="isYouTube"
                :src="`https://www.youtube-nocookie.com/embed/${selectedProject.youtubeId}?autoplay=1&mute=0&rel=0`"
                class="w-full h-full aspect-video border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              <!-- 2. Video Player (Reel / Local MP4) -->
              <div v-else-if="isVideo" class="relative max-h-full flex items-center justify-center">
                <video 
                  v-if="selectedProject.videoUrl"
                  :src="selectedProject.videoUrl"
                  controls
                  autoplay
                  playsinline
                  class="max-h-[540px] rounded-lg shadow-2xl object-contain"
                ></video>
                <div v-else class="relative group">
                  <img 
                    :src="selectedProject.image" 
                    :alt="selectedProject.title"
                    class="max-h-[540px] rounded-lg object-contain shadow-2xl"
                  />
                  <a 
                    :href="selectedProject.link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all rounded-lg"
                  >
                    <div class="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-xl shadow-blue-600/50 group-hover:scale-110 transition-transform">
                      <svg class="w-7 h-7 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </a>
                </div>
              </div>

              <!-- 3. Multi-Slide Carousel -->
              <div 
                v-else-if="isCarousel" 
                class="relative w-full h-[480px] md:h-[540px] flex items-center justify-center select-none"
                @touchstart="onTouchStart"
                @touchend="onTouchEnd"
              >
                <!-- Image Container with Transition -->
                <div class="relative w-full h-full flex items-center justify-center p-4">
                  <img 
                    :src="slides[currentSlide]" 
                    :alt="`${selectedProject.title} - Slide ${currentSlide + 1}`"
                    class="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
                  />
                </div>

                <!-- Prev Button -->
                <button 
                  v-if="slides.length > 1"
                  type="button" 
                  @click="prevSlide"
                  class="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md shadow-lg transition-transform hover:scale-110 active:scale-95"
                  aria-label="Slide sebelumnya"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>

                <!-- Next Button -->
                <button 
                  v-if="slides.length > 1"
                  type="button" 
                  @click="nextSlide"
                  class="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md shadow-lg transition-transform hover:scale-110 active:scale-95"
                  aria-label="Slide berikutnya"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </button>

                <!-- Counter Pill Top-Left -->
                <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-white/90">
                  {{ currentSlide + 1 }} / {{ slides.length }}
                </div>

                <!-- Slide Dots Indicator Bottom -->
                <div v-if="slides.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <button 
                    v-for="(_, idx) in slides" 
                    :key="idx"
                    type="button" 
                    @click="goToSlide(idx)"
                    class="h-2 rounded-full transition-all duration-300"
                    :class="idx === currentSlide ? 'w-6 bg-brand-blue shadow-[0_0_8px_#2563EB]' : 'w-2 bg-white/40 hover:bg-white/70'"
                    :aria-label="`Pergi ke slide ${idx + 1}`"
                  ></button>
                </div>
              </div>

              <!-- 4. High-Res Static Image Preview -->
              <div v-else-if="isStaticImage" class="relative max-h-full p-4 flex items-center justify-center">
                <img 
                  :src="selectedProject.image" 
                  :alt="selectedProject.title"
                  class="max-h-[500px] max-w-full rounded-xl object-contain shadow-2xl"
                />
              </div>

              <!-- Top Left Format Badge -->
              <div class="absolute top-4 left-4 pointer-events-none">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-900/85 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-wider text-white">
                  <span class="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#00F0FF]"></span>
                  {{ selectedProject.category.toUpperCase() }}
                </span>
              </div>
            </div>

            <!-- DETAIL & METADATA -->
            <div class="p-6 md:p-8 flex flex-col gap-6">
              <!-- Header info -->
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-mono font-semibold uppercase tracking-wider text-brand-blue">{{ selectedProject.tag || selectedProject.category }}</span>
                    <span v-if="selectedProject.client" class="text-white/30">•</span>
                    <span v-if="selectedProject.client" class="text-xs font-mono text-brand-muted">Client: {{ selectedProject.client }}</span>
                  </div>
                  <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight">{{ selectedProject.title }}</h2>
                </div>

                <!-- CTA Button -->
                <a 
                  v-if="selectedProject.link"
                  :href="selectedProject.link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-accent text-white font-medium text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                >
                  <span>{{ isCarousel ? 'Lihat Carousel di IG' : (isYouTube ? 'Buka di YouTube' : 'Lihat di Instagram') }}</span>
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                </a>
              </div>

              <!-- Description -->
              <p class="text-sm md:text-base text-white/70 leading-relaxed">{{ selectedProject.description }}</p>

              <!-- Technical Specifications Grid -->
              <div v-if="selectedProject.specs" class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-xs">
                <div class="flex flex-col gap-1">
                  <span class="font-mono text-white/40 uppercase tracking-wider">SOFTWARE</span>
                  <span class="font-semibold text-white">{{ selectedProject.specs.software || 'Adobe Suite' }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="font-mono text-white/40 uppercase tracking-wider">FORMAT / DELIVERABLE</span>
                  <span class="font-semibold text-white">{{ selectedProject.specs.format || selectedProject.aspectRatio || 'Standard' }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="font-mono text-white/40 uppercase tracking-wider">SCOPE</span>
                  <span class="font-semibold text-white">{{ selectedProject.specs.scope || 'Creative Direction' }}</span>
                </div>
              </div>

              <!-- Tags / Chips -->
              <div v-if="selectedProject.tags && selectedProject.tags.length > 0" class="flex flex-wrap gap-2 pt-2">
                <span 
                  v-for="t in selectedProject.tags" 
                  :key="t"
                  class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 font-mono"
                >
                  {{ t }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
