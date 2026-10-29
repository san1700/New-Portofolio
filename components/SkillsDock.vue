<template>
  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 w-full">
    
    <!-- 1. Premiere Pro -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <img src="/images/logo-premiere.webp" alt="Premiere Pro" class="w-full h-full object-contain filter group-hover:brightness-110 transition-all" loading="lazy" />
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">Premiere Pro</span>
    </div>

    <!-- 2. CapCut Pro -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <img src="/images/logo-capcut.webp" alt="CapCut Pro" class="w-full h-full object-contain filter group-hover:brightness-110 transition-all" loading="lazy" />
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">CapCut Pro</span>
    </div>

    <!-- 3. After Effects -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="11" fill="#00005B"/>
          <path d="M14 32L18.8 17h3.4L27 32h-3.2l-1.3-4.2h-4.8L16.4 32H14zm4.4-7h3.3l-1.6-5.8h-.1l-1.6 5.8z" fill="#9999FF"/>
          <path d="M28.5 25.8c0-3.8 2.6-6.8 6.2-6.8 3.5 0 5.7 2.6 5.7 6.4v.8h-8.8c.2 2 1.6 3.2 3.4 3.2 1.4 0 2.4-.6 3-1.6l2.3 1.4c-1.1 1.7-2.8 2.8-5.3 2.8-3.9 0-6.5-2.7-6.5-6.2zm8.8-1.5c-.1-1.7-1.3-2.9-2.9-2.9-1.6 0-2.8 1.1-3 2.9h5.9z" fill="#9999FF"/>
        </svg>
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">After Effects</span>
    </div>

    <!-- 4. DaVinci Resolve -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="11" fill="#14171C"/>
          <path d="M24 10c-3.5 0-6 3-4.5 6.5l3.5 7.5 3.5-7.5c1.5-3.5-1-6.5-4.5-6.5z" fill="#FF3850"/>
          <path d="M12 31c2 3 5.5 3.5 8 1.5l7-4.5-8-2c-3.8-1-6.5 1.5-7 5z" fill="#00DF73"/>
          <path d="M36 31c-2 3-5.5 3.5-8 1.5l-7-4.5 8-2c3.8-1 6.5 1.5 7 5z" fill="#00A6FF"/>
          <circle cx="24" cy="24" r="2.8" fill="#FFFFFF"/>
        </svg>
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">DaVinci</span>
    </div>

    <!-- 5. Sony Alpha -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="11" fill="#18181A"/>
          <path d="M24.5 13c-4.2 0-7.5 3.2-7.5 7.5 0 2.8 1.4 5.2 3.6 6.5L14 34h4.2l5.2-5.8c.4.1.8.1 1.1.1 4.5 0 8-3.2 8-7.5 0-4.3-3.5-7.8-8-7.8zm0 11.8c-2.4 0-4.3-1.8-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z" fill="#FF5E00"/>
          <circle cx="24.5" cy="18.9" r="2.3" fill="#FFA500"/>
        </svg>
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">Sony Alpha</span>
    </div>

    <!-- 6. DJI Drone -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="11" fill="#14171F"/>
          <rect x="21" y="19" width="6" height="10" rx="3" fill="#E2E8F0"/>
          <circle cx="24" cy="22" r="1.8" fill="#5E6AD2"/>
          <line x1="16" y1="16" x2="22" y2="21" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <line x1="32" y1="16" x2="26" y2="21" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="32" x2="22" y2="27" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <line x1="32" y1="32" x2="26" y2="27" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <circle cx="15" cy="15" r="4" stroke="#6872D9" stroke-width="1.6" fill="rgba(94,106,210,0.2)"/>
          <circle cx="33" cy="15" r="4" stroke="#6872D9" stroke-width="1.6" fill="rgba(94,106,210,0.2)"/>
          <circle cx="15" cy="33" r="4" stroke="#6872D9" stroke-width="1.6" fill="rgba(94,106,210,0.2)"/>
          <circle cx="33" cy="33" r="4" stroke="#6872D9" stroke-width="1.6" fill="rgba(94,106,210,0.2)"/>
        </svg>
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">DJI Drone</span>
    </div>

    <!-- 7. Figma -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="11" fill="#1C1C1E"/>
          <g transform="translate(14, 10)">
            <path d="M0 0h5a5 5 0 0 1 0 10H0V0z" fill="#FF7262" transform="translate(5, 0)"/>
            <path d="M5 0a5 5 0 0 0-5 5 5 5 0 0 0 5 5h5V0H5z" fill="#F24E1E"/>
            <path d="M5 10a5 5 0 0 0-5 5 5 5 0 0 0 5 5h5v-10H5z" fill="#A259FF"/>
            <circle cx="15" cy="15" r="5" fill="#1ABCFE"/>
            <path d="M5 20a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5v-5H5z" fill="#0ACF83"/>
          </g>
        </svg>
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">Figma</span>
    </div>

    <!-- 8. Photoshop -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <img src="/images/logo-photoshop.png" alt="Adobe Photoshop" class="w-full h-full object-contain filter group-hover:brightness-110 transition-all" loading="lazy" />
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">Photoshop</span>
    </div>

    <!-- 9. Illustrator -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <svg class="w-full h-full" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="11" fill="#330000"/>
          <path d="M14 32L18.8 17h3.4L27 32h-3.2l-1.3-4.2h-4.8L16.4 32H14zm4.4-7h3.3l-1.6-5.8h-.1l-1.6 5.8z" fill="#FF9A00"/>
          <path d="M29.5 20h3.2V32h-3.2V20zm0-4.5a1.8 1.8 0 1 1 3.6 0 1.8 1.8 0 0 1-3.6 0z" fill="#FF9A00"/>
        </svg>
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">Illustrator</span>
    </div>

    <!-- 10. Lightroom -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <img src="/images/logo-lightroom.png" alt="Adobe Lightroom" class="w-full h-full object-contain filter group-hover:brightness-110 transition-all" loading="lazy" />
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">Lightroom</span>
    </div>

    <!-- 11. CorelDraw -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <img src="/images/logo-coreldraw.png" alt="CorelDraw" class="w-full h-full object-contain filter group-hover:brightness-110 transition-all" loading="lazy" />
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">CorelDraw</span>
    </div>

    <!-- 12. Canva Pro -->
    <div class="group flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[88px]">
      <div class="w-6 h-6 sm:w-8 sm:h-8 mb-1 flex items-center justify-center">
        <img src="/images/logo-canva.png" alt="Canva Pro" class="w-full h-full object-contain filter group-hover:brightness-110 transition-all" loading="lazy" />
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors">Canva Pro</span>
    </div>

  </div>
</template>
