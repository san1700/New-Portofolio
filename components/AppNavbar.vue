<script setup lang="ts">
import { ref, onMounted } from 'vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isLight = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleTheme = () => {
  if (typeof document === 'undefined') return
  isLight.value = !isLight.value
  if (isLight.value) {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('portfolio_theme', 'light')
  } else {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('portfolio_theme', 'dark')
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    const savedTheme = localStorage.getItem('portfolio_theme')
    if (savedTheme === 'light') {
      isLight.value = true
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      isLight.value = false
      document.documentElement.removeAttribute('data-theme')
    }
  }
})
</script>

<template>
  <header class="navbar">
    <div class="nav-capsule">
      <NuxtLink to="/" class="nav-capsule-brand">
        <span class="brand-text">SANMHMD</span>
      </NuxtLink>
      <span class="nav-capsule-sep" aria-hidden="true"></span>
      <nav class="nav-links">
        <!-- Home with Hover Popover (Sekeco Minimalist Style) -->
        <div class="nav-item-dropdown" id="home-dropdown-wrap">
          <NuxtLink 
            to="/" 
            class="nav-link nav-link-dropdown"
            :class="{ active: route.path === '/' }"
            aria-haspopup="true"
            aria-expanded="false" 
            id="home-nav-trigger"
          >
            <span>Home</span>
            <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </NuxtLink>

          <!-- Sekeco Minimalist Flyout Menu (No Header, No Footer, Pure Stroke Icons) -->
          <div class="nav-popover nav-popover-minimal" role="region" aria-label="Home Navigation Overview">
            <div class="popover-arrow" aria-hidden="true"></div>
            <div class="popover-grid popover-grid-minimal">
              <!-- Item 1: We are San -->
              <a href="/#about" class="popover-item-min">
                <svg class="popover-min-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                  <path d="M9 22v-4h6v4" />
                  <path d="M8 6h.01" />
                  <path d="M16 6h.01" />
                  <path d="M8 10h.01" />
                  <path d="M16 10h.01" />
                  <path d="M8 14h.01" />
                  <path d="M16 14h.01" />
                </svg>
                <div class="popover-min-text">
                  <div class="popover-min-title">We are San</div>
                  <p class="popover-min-desc">Creative Director &amp; Multi-Disciplinary Visual Creator</p>
                </div>
              </a>

              <!-- Item 2: Our Services -->
              <a href="/#services" class="popover-item-min">
                <svg class="popover-min-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <div class="popover-min-text">
                  <div class="popover-min-title">Our Services</div>
                  <p class="popover-min-desc">Video Editing, 4K Drone, Retouch, UI/UX &amp; Brand Identity</p>
                </div>
              </a>

              <!-- Item 3: Our Projects -->
              <a href="/#work" class="popover-item-min">
                <svg class="popover-min-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12 15 2 2 4-4" />
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="m3 9 2.45-1.96a2 2 0 0 1 2.5 0L12 10.5l4.05-3.46a2 2 0 0 1 2.5 0L21 9" />
                </svg>
                <div class="popover-min-text">
                  <div class="popover-min-title">Our Projects</div>
                  <p class="popover-min-desc">Commercial Reels, Drone Shorts &amp; Design Systems</p>
                </div>
              </a>

              <!-- Item 4: Dual Concentration -->
              <a href="/#tracks" class="popover-item-min">
                <svg class="popover-min-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <div class="popover-min-text">
                  <div class="popover-min-title">Dual Concentration</div>
                  <p class="popover-min-desc">Cinema &amp; Media Track vs Graphic &amp; UI/UX Track</p>
                </div>
              </a>

              <!-- Item 5: Client Testimonials -->
              <a href="/#testimonials" class="popover-item-min">
                <svg class="popover-min-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <div class="popover-min-text">
                  <div class="popover-min-title">Client Testimonials</div>
                  <p class="popover-min-desc">What Clients Say About Our Creative Solutions</p>
                </div>
              </a>

              <!-- Item 6: Creative Arsenal -->
              <a href="/#gear" class="popover-item-min">
                <svg class="popover-min-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                <div class="popover-min-text">
                  <div class="popover-min-title">Creative Arsenal</div>
                  <p class="popover-min-desc">Sony, DJI Drone, DaVinci, Premiere, Figma &amp; Photoshop</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Dual Tracks Switcher with Minimalist Dropdown -->
        <div class="nav-item-dropdown" id="tracks-dropdown-wrap">
          <a 
            href="#tracks" 
            class="nav-link nav-link-dropdown"
            :class="{ active: route.path === '/cinema' || route.path === '/design' }"
            aria-haspopup="true"
            aria-expanded="false" 
            id="tracks-nav-trigger"
          >
            <span>Tracks</span>
            <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
          <div class="nav-popover nav-popover-minimal nav-popover-tracks" role="region" aria-label="Track Navigation">
            <div class="popover-arrow" aria-hidden="true"></div>
            <div class="popover-grid popover-grid-minimal popover-grid-tracks">
              <!-- Track 1: Cinema & Media -->
              <NuxtLink to="/cinema" class="popover-item-min">
                <svg class="popover-min-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m22 8-6 4 6 4V8Z" />
                  <rect width="14" height="12" x="2" y="6" rx="2" />
                </svg>
                <div class="popover-min-text">
                  <div class="popover-min-title">Cinema &amp; Media</div>
                  <p class="popover-min-desc">Commercial Reels, Drone Videography &amp; Visual Production</p>
                </div>
              </NuxtLink>

              <!-- Track 2: Graphic & UI/UX -->
              <NuxtLink to="/design" class="popover-item-min">
                <svg class="popover-min-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                <div class="popover-min-text">
                  <div class="popover-min-title">Graphic &amp; UI/UX</div>
                  <p class="popover-min-desc">UI/UX Mobile Apps, Design Systems &amp; Visual Identity</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <a href="#contact" class="nav-link">Contact</a>
      </nav>
      <span class="nav-capsule-sep" aria-hidden="true"></span>

      <!-- Theme Toggle Button (Light / Dark Mode) -->
      <button 
        class="theme-toggle-btn" 
        id="theme-toggle-btn" 
        aria-label="Toggle Light/Dark Theme"
        :title="isLight ? 'Mode Siang Aktif — Klik untuk Beralih ke Mode Malam' : 'Mode Malam Aktif — Klik untuk Beralih ke Mode Siang'"
        @click="toggleTheme"
      >
        <svg class="theme-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <svg class="theme-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <!-- CTA Button -->
      <a href="#contact" class="nav-capsule-cta">
        Mulai Kolaborasi <span class="cta-arrow">↗</span>
      </a>

      <!-- Hamburger menu (Mobile) -->
      <button class="mobile-menu-btn" aria-label="Toggle menu" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Drawer Menu -->
    <div v-if="isMobileMenuOpen" class="mobile-menu-drawer active" style="position: fixed; inset: 70px 16px auto 16px; z-index: 100; background: var(--bg-elevated); border: 1px solid var(--border-default); border-radius: 16px; padding: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
      <nav class="flex flex-col gap-sm" style="display: flex; flex-direction: column; gap: 12px;">
        <NuxtLink to="/" class="nav-link" @click="closeMobileMenu">Home</NuxtLink>
        <NuxtLink to="/cinema" class="nav-link" @click="closeMobileMenu">Cinema Track</NuxtLink>
        <NuxtLink to="/design" class="nav-link" @click="closeMobileMenu">Design Track</NuxtLink>
        <a href="#contact" class="nav-link" @click="closeMobileMenu">Contact</a>
        <a href="https://wa.me/6287754388856?text=Halo%20Mohammad%20Ikhsan" target="_blank" rel="noopener noreferrer" class="btn btn-primary rounded-pill w-full mt-sm" style="text-align: center; margin-top: 8px;">
          Mulai Kolaborasi ↗
        </a>
      </nav>
    </div>
  </header>
</template>
