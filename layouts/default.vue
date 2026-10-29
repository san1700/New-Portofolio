<script setup lang="ts">
import { onMounted } from 'vue'
import Lenis from 'lenis'

onMounted(() => {
  // Initialize Lenis smooth scroll on client
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})
</script>

<template>
  <div class="relative min-h-screen bg-obsidian-950 text-brand-text flex flex-col font-sans selection:bg-brand-blue selection:text-white">
    <!-- Ambient Radial Glows -->
    <div class="ambient-glow" aria-hidden="true"></div>

    <!-- Global Floating Navbar -->
    <AppNavbar />

    <!-- Main Content Area -->
    <main class="flex-1 w-full pt-20 md:pt-24 z-10">
      <slot />
    </main>

    <!-- Global Footer -->
    <AppFooter />

    <!-- Global Interactive Project Modal -->
    <ProjectModal />

    <!-- Floating WhatsApp Button -->
    <a 
      href="https://wa.me/6287754388856?text=Halo%20Mohammad%20Ikhsan,%20saya%20tertarik%20bekerja%20sama%20projek."
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
      aria-label="Hubungi via WhatsApp"
    >
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.116-.067-.534-.183-1.222-.525-2.094-1.397-.872-.872-1.214-1.56-1.397-2.094-.144-.418-.112-.804-.067-1.116.05-.333.419-1.026.824-1.17.135-.048.281-.073.418-.073.104 0 .198.005.275.015.22.028.337.165.419.349.124.28.423 1.034.46 1.11.038.075.063.165.013.265-.05.1-.075.163-.15.251-.076.088-.16.196-.228.264-.076.075-.155.158-.067.308.088.15.39 1.135 1.547 2.167 1.205 1.074 1.705 1.282 1.868 1.378.163.096.257.08.353-.03.096-.11.412-.48.522-.645.11-.165.22-.138.37-.083.15.055.952.449 1.117.531.165.083.275.124.316.193.04.069.04.4-.104.805z"/>
      </svg>
    </a>
  </div>
</template>
