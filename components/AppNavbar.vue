<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Overview', path: '/' },
  { name: 'Cinema Track', path: '/cinema' },
  { name: 'Design Track', path: '/design' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
    <nav 
      class="pointer-events-auto flex items-center justify-between gap-3 md:gap-8 px-4 md:px-6 py-2.5 rounded-full bg-obsidian-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 transition-all duration-300 w-full max-w-3xl"
      aria-label="Navigasi Utama"
    >
      <!-- Brand Logo / Name -->
      <NuxtLink to="/" class="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-full px-2 py-1">
        <div class="w-2.5 h-2.5 rounded-full bg-brand-blue shadow-[0_0_10px_#2563EB] group-hover:scale-125 transition-transform"></div>
        <span class="font-mono font-bold tracking-wider text-sm md:text-base text-white group-hover:text-brand-accent transition-colors">SANMHMD</span>
      </NuxtLink>

      <!-- Desktop Nav Links -->
      <div class="hidden md:flex items-center gap-1 font-medium text-sm">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="px-3.5 py-1.5 rounded-full transition-all duration-200"
          :class="route.path === link.path 
            ? 'bg-white/10 text-white font-semibold shadow-inner shadow-white/5 border border-white/10' 
            : 'text-brand-muted hover:text-white hover:bg-white/5'"
        >
          {{ link.name }}
        </NuxtLink>
      </div>

      <!-- Action Button (WhatsApp / Contact) -->
      <div class="flex items-center gap-2">
        <a 
          href="https://wa.me/6287754388856?text=Halo%20Mohammad%20Ikhsan,%20saya%20tertarik%20bekerja%20sama."
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue hover:bg-brand-accent text-white font-medium text-xs md:text-sm shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span>Kolaborasi</span>
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>

        <!-- Mobile Menu Button -->
        <button 
          type="button" 
          @click="toggleMobileMenu" 
          class="md:hidden p-2 rounded-full text-brand-muted hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Dropdown Menu -->
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-x-4 top-20 z-40 p-4 rounded-2xl bg-obsidian-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl md:hidden"
    >
      <div class="flex flex-col gap-2 font-medium">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          @click="closeMobileMenu"
          class="px-4 py-3 rounded-xl transition-colors"
          :class="route.path === link.path ? 'bg-white/10 text-white font-semibold' : 'text-brand-muted hover:text-white hover:bg-white/5'"
        >
          {{ link.name }}
        </NuxtLink>
        <div class="pt-2 mt-1 border-t border-white/10">
          <a 
            href="https://wa.me/6287754388856?text=Halo%20Mohammad%20Ikhsan,%20saya%20tertarik%20bekerja%20sama."
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-blue text-white font-semibold text-sm shadow-lg shadow-blue-600/30"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>
