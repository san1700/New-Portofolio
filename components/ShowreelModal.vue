<script setup lang="ts">
import { useProjectModal } from '~/composables/useProjectModal'

const { isShowreelModalOpen, closeShowreelModal } = useProjectModal()
</script>

<template>
  <div 
    id="showreel-modal" 
    class="modal-overlay" 
    :class="{ active: isShowreelModalOpen }"
    role="dialog" 
    aria-modal="true" 
    :aria-hidden="!isShowreelModalOpen"
    @click.self="closeShowreelModal"
  >
    <div class="modal-container modal-showreel">
      <button class="modal-close" id="close-showreel-modal" aria-label="Close modal" @click="closeShowreelModal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="showreel-video-wrapper">
        <video id="showreel-video" class="showreel-video" controls playsinline preload="metadata"
          poster="/images/project-persidangan-semu.webp">
          <source src="/videos/project-persidangan-semu.mp4" type="video/mp4">
          Browser Anda tidak mendukung pemutar video HTML5.
        </video>
      </div>
      <div class="modal-body">
        <div class="showreel-info-row flex items-center justify-between flex-wrap gap-md">
          <div>
            <span class="text-accent uppercase letter-spacing font-sm font-semibold">OFFICIAL SHOWREEL</span>
            <h2 class="modal-title mt-xs">Mohammad Ikhsan — <span class="text-accent">Visual Showreel</span></h2>
            <p class="text-muted mt-xs">Kompilasi sinematik video editing ritmis, aerial videografi drone, dan color grading dinamis.</p>
          </div>
          <a href="https://www.instagram.com/san_mhmd17/" target="_blank" rel="noopener noreferrer"
            class="btn btn-secondary rounded-pill flex items-center gap-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>Portofolio Instagram</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

