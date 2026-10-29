<template>
  <footer class="relative z-10 border-t border-white/10 bg-obsidian-950 py-16 px-6 md:px-12 text-sm text-brand-muted">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <!-- Left: Identity & Status -->
      <div class="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
        <div class="flex items-center gap-3">
          <span class="font-mono text-xl font-bold tracking-wider text-white">SANMHMD</span>
          <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            AVAILABLE FOR PROJECTS
          </span>
        </div>
        <p class="max-w-md text-xs md:text-sm text-white/60">
          Personal portfolio of Mohammad Ikhsan. High-rhythm Video Editor, Videographer, and Visual Designer based in Indonesia.
        </p>
      </div>

      <!-- Right: Social Links -->
      <div class="flex items-center gap-4 text-xs font-mono">
        <a 
          href="https://www.instagram.com/san_mhmd17/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all duration-200 hover:scale-105"
        >
          Instagram ↗
        </a>
        <a 
          href="https://www.youtube.com/@sanmhmd" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all duration-200 hover:scale-105"
        >
          YouTube ↗
        </a>
        <a 
          href="https://github.com/san1700" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all duration-200 hover:scale-105"
        >
          GitHub ↗
        </a>
      </div>
    </div>

    <!-- Bottom Copyright -->
    <div class="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
      <p>&copy; {{ new Date().getFullYear() }} SANMHMD — Mohammad Ikhsan. All rights reserved.</p>
      <p class="font-mono">Engineered with Nuxt 3 &amp; Tailwind CSS</p>
    </div>
  </footer>
</template>

