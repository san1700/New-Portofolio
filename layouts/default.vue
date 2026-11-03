<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import Lenis from 'lenis'
import { useProjectModal } from '~/composables/useProjectModal'

const route = useRoute()
const { openContactModal } = useProjectModal()
const showBackToTop = ref(false)
let lenisInstance: Lenis | null = null

const scrollToTop = () => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleMouseMove = (e: MouseEvent) => {
  const cards = document.querySelectorAll('.spotlight-card, .project-card, .service-card, .service-card-sekeco, .portal-card')
  cards.forEach((card) => {
    const el = card as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
  })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400
}

const handleGlobalClick = (e: MouseEvent) => {
  const target = (e.target as HTMLElement).closest('a[href="#contact"], .modal-contact-trigger, #modal-inquire-btn')
  if (target) {
    e.preventDefault()
    openContactModal()
  }
}

let revealObserver: IntersectionObserver | null = null

const setupRevealObserver = () => {
  if (typeof window === 'undefined') return
  if (revealObserver) {
    revealObserver.disconnect()
  }

  // 1. Activate any elements in the initial viewport immediately
  const viewH = window.innerHeight || 800
  document.querySelectorAll('.reveal:not(.active)').forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top < viewH + 150) {
      el.classList.add('active', 'visible')
    }
  })

  // 2. Observer for remaining elements as user scrolls
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active', 'visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.05, rootMargin: '60px 0px 60px 0px' }
  )

  document.querySelectorAll('.reveal:not(.active), .animate-on-scroll').forEach((el) => {
    revealObserver?.observe(el)
  })
}

watch(() => route.path, () => {
  nextTick(() => {
    setupRevealObserver()
  })
})

onMounted(() => {
  // 1. Prevent theme flash & apply theme
  try {
    const saved = localStorage.getItem('portfolio_theme')
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  } catch (e) {}

  // 2. Lenis Smooth Scroll
  try {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    })

    function raf(time: number) {
      lenisInstance?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  } catch (err) {
    console.error('Lenis init error:', err)
  }

  // 3. Spotlight tracking
  window.addEventListener('mousemove', handleMouseMove, { passive: true })

  // 4. Back to top scroll tracking
  window.addEventListener('scroll', handleScroll, { passive: true })

  // 5. Contact modal trigger listener
  window.addEventListener('click', handleGlobalClick)

  // 6. Reveal observer
  nextTick(() => {
    setupRevealObserver()
  })
  setTimeout(() => {
    setupRevealObserver()
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleGlobalClick)
  if (revealObserver) {
    revealObserver.disconnect()
  }
  if (lenisInstance) {
    lenisInstance.destroy()
  }
})
</script>

<template>
  <div class="relative min-h-screen text-brand-text flex flex-col font-sans">
    <!-- Linear Multi-Layer Ambient Background System -->
    <div class="bg-base-radial" aria-hidden="true"></div>
    <div class="bg-noise" aria-hidden="true"></div>
    <div class="bg-grid-overlay" aria-hidden="true"></div>
    <div class="ambient-blobs" aria-hidden="true">
      <div class="blob blob-primary"></div>
      <div class="blob blob-secondary"></div>
      <div class="blob blob-tertiary"></div>
    </div>

    <!-- Floating Capsule Navbar -->
    <AppNavbar />

    <!-- Main Content -->
    <main class="flex-1 w-full z-10">
      <slot />
    </main>

    <!-- Global Footer -->
    <AppFooter />

    <!-- Modals -->
    <ProjectModal />
    <ShowreelModal />
    <ContactModal />

    <!-- Floating Actions Container (WhatsApp & Back to Top) -->
    <div class="floating-actions-container">
      <button 
        class="back-to-top" 
        id="back-to-top" 
        :class="{ visible: showBackToTop }"
        @click="scrollToTop" 
        aria-label="Kembali ke atas" 
        title="Kembali ke atas"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>

      <a 
        href="https://wa.me/6281807882493?text=Halo%20Ikhsan,%20saya%20tertarik%20untuk%20mendiskusikan%20proyek%20bersama%20Anda."
        target="_blank" 
        rel="noopener noreferrer" 
        class="floating-whatsapp" 
        aria-label="Chat WhatsApp"
        title="Chat via WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z" />
        </svg>
        <span class="floating-tooltip">Chat via WhatsApp</span>
      </a>
    </div>
  </div>
</template>
