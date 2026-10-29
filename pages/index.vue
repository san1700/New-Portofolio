<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectsData, statsData, testimonialsData, type Project } from '~/data/portfolio'

useSeoMeta({
  title: 'SANMHMD | Mohammad Ikhsan - Video Editor & Visual Creator',
  description: 'Portofolio resmi Mohammad Ikhsan (SANMHMD) — Creative Enthusiast, Video Editor, Videographer, dan Visual Creator. Spesialis Video Reels, Videografi Sinematik, dan Brand Identity.',
  ogImage: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2',
})

const categories = ['Semua Karya', 'Video Editing', 'Videography', 'Social Carousel', 'Poster Design']
const activeCategory = ref('Semua Karya')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'Semua Karya') {
    return projectsData
  }
  return projectsData.filter((p: Project) => p.category === activeCategory.value)
})
</script>

<template>
  <div class="flex flex-col gap-24 md:gap-32 pb-24">
    <!-- HERO SECTION -->
    <section class="relative min-h-[85vh] flex items-center justify-center px-4 md:px-8">
      <div class="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left: Text & Action -->
        <div class="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
          <!-- Status pill -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#00F0FF]"></span>
            <span class="text-xs font-mono font-medium tracking-wide text-white/90">CREATIVE ENTHUSIAST &amp; VISUAL CREATOR</span>
          </div>

          <!-- Main Title -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Menghidupkan Cerita Lewat <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-brand-cyan to-indigo-400">Visual Berdaya Pikat.</span>
          </h1>

          <!-- Body Subtitle -->
          <p class="max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
            Spesialis video editing ritmis, videografi sinematik 4K, aerial drone, serta perancangan desain visual yang memikat atensi dan mengubah impresi menjadi aksi.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <NuxtLink 
              to="/cinema" 
              class="px-6 py-3.5 rounded-full bg-brand-blue hover:bg-brand-accent text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Jelajahi Cinema Track</span>
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </NuxtLink>
            <NuxtLink 
              to="/design" 
              class="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Graphic &amp; Design Track
            </NuxtLink>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
            <div v-for="stat in statsData" :key="stat.label" class="flex flex-col">
              <span class="text-2xl sm:text-3xl font-extrabold font-mono text-white">{{ stat.value }}</span>
              <span class="text-xs text-brand-muted mt-0.5">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Creator Portrait Card -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 bg-obsidian-900 shadow-2xl shadow-blue-500/10 group">
            <img 
              src="/images/og-cover.jpg?v=2" 
              alt="Mohammad Ikhsan (SANMHMD)"
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 flex flex-col gap-1">
              <span class="text-xs font-mono font-semibold text-brand-cyan tracking-wider">MOHAMMAD IKHSAN</span>
              <span class="text-lg font-bold text-white">Visual Storyteller &amp; Director</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- DUAL CONCENTRATION SECTION -->
    <section class="max-w-6xl mx-auto px-4 md:px-8 w-full flex flex-col gap-12">
      <div class="flex flex-col gap-3 text-center items-center">
        <span class="text-xs font-mono uppercase tracking-widest text-brand-blue font-semibold">DUAL CONCENTRATION</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Dua Jalur Keahlian Utama</h2>
        <p class="max-w-lg text-sm md:text-base text-white/60">Pilih konsentrasi sesuai kebutuhan produksi visual Anda.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Cinema Portal Card -->
        <NuxtLink 
          to="/cinema"
          class="group relative p-8 md:p-10 rounded-2xl bg-obsidian-900 border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-600/15 flex flex-col justify-between min-h-[320px]"
        >
          <div class="flex flex-col gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-4 4 4 4V8z"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-white group-hover:text-brand-accent transition-colors">Cinema &amp; Media Track</h3>
            <p class="text-sm text-white/70 leading-relaxed">
              Video editing ritmis cepat, komersial video 4K, aerial drone, dan filmic color grading dengan DaVinci Resolve &amp; Premiere Pro.
            </p>
          </div>
          <div class="flex items-center gap-2 text-sm font-semibold text-brand-accent group-hover:translate-x-1 transition-transform pt-4">
            <span>Buka Cinema Track</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </NuxtLink>

        <!-- Design Portal Card -->
        <NuxtLink 
          to="/design"
          class="group relative p-8 md:p-10 rounded-2xl bg-obsidian-900 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-600/15 flex flex-col justify-between min-h-[320px]"
        >
          <div class="flex flex-col gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">Graphic &amp; UI/UX Design</h3>
            <p class="text-sm text-white/70 leading-relaxed">
              Perancangan sistem antarmuka UI/UX mobile, carousel edukatif berslide banyak, dan poster tipografi modern dengan Figma &amp; Photoshop.
            </p>
          </div>
          <div class="flex items-center gap-2 text-sm font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform pt-4">
            <span>Buka Design Track</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- SELECTED WORKS SECTION -->
    <section id="work" class="max-w-6xl mx-auto px-4 md:px-8 w-full flex flex-col gap-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-brand-blue font-semibold">PORTFOLIO</span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">Karya Pilihan</h2>
        </div>

        <!-- Filter Pills Bar -->
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="cat in categories" 
            :key="cat"
            type="button" 
            @click="activeCategory = cat"
            class="px-4 py-2 rounded-full font-mono text-xs transition-all duration-200"
            :class="activeCategory === cat 
              ? 'bg-brand-blue text-white shadow-lg shadow-blue-600/30 font-semibold' 
              : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Works Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id" 
          :project="project"
        />
      </div>
    </section>

    <!-- ARSENAL / STACK SECTION -->
    <section id="gear" class="max-w-6xl mx-auto px-4 md:px-8 w-full flex flex-col gap-8">
      <div class="flex flex-col gap-2 text-center items-center">
        <span class="text-xs font-mono uppercase tracking-widest text-brand-blue font-semibold">PRODUCTION GEAR &amp; TOOLS</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Creative Stack</h2>
        <p class="max-w-md text-xs md:text-sm text-white/60">Perangkat keras dan lunak berstandar industri yang saya andalkan.</p>
      </div>

      <SkillsDock />
    </section>

    <!-- CLIENT TESTIMONIALS -->
    <section class="max-w-6xl mx-auto px-4 md:px-8 w-full flex flex-col gap-10">
      <div class="flex flex-col gap-2 text-center items-center">
        <span class="text-xs font-mono uppercase tracking-widest text-brand-blue font-semibold">TESTIMONIALS</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Apa Kata Klien</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="item in testimonialsData.slice(0, 3)" 
          :key="item.id"
          class="p-6 md:p-8 rounded-2xl bg-obsidian-900 border border-white/10 flex flex-col justify-between gap-6"
        >
          <p class="text-sm md:text-base text-white/80 italic leading-relaxed">
            "{{ item.quote }}"
          </p>
          <div class="flex items-center gap-3 pt-4 border-t border-white/5">
            <div class="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center font-bold text-brand-accent text-sm">
              {{ (item.name || item.author || 'C').charAt(0) }}
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-white text-sm">{{ item.name || item.author }}</span>
              <span class="text-xs text-brand-muted">{{ item.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
