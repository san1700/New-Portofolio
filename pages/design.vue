<script setup lang="ts">
import { ref, computed } from 'vue'
import { designProjects, type Project } from '~/data/portfolio'

useSeoMeta({
  title: 'Graphic & UI/UX Design Track | Mohammad Ikhsan',
  description: 'Eksplorasi portofolio UI/UX mobile apps, identitas brand, carousel edukatif, dan poster tipografi oleh Mohammad Ikhsan.',
  ogImage: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2',
})

const subCategories = ['Semua', 'Social Carousel', 'Poster Design']
const activeSubCategory = ref('Semua')

const filteredDesignProjects = computed(() => {
  if (activeSubCategory.value === 'Semua') {
    return designProjects
  }
  return designProjects.filter((p: Project) => p.category === activeSubCategory.value)
})
</script>

<template>
  <div class="flex flex-col gap-24 md:gap-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto w-full">
    
    <!-- SUBPAGE HERO -->
    <section class="flex flex-col gap-6 pt-6">
      <div class="flex items-center gap-2 text-xs font-mono text-brand-muted">
        <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
        <span>/</span>
        <span class="text-emerald-400">Graphic &amp; UI/UX Design Track</span>
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="flex flex-col gap-3">
          <span class="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">TRACK 02 // GRAPHIC &amp; SYSTEMS</span>
          <h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Graphic &amp; UI/UX Design</h1>
          <p class="max-w-xl text-base md:text-lg text-white/70">
            Perancangan identitas visual, carousel multi-slide Instagram berkonversi tinggi, poster tipografi, dan antarmuka digital yang bersih.
          </p>
        </div>

        <!-- Filter Sub-categories -->
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="sub in subCategories" 
            :key="sub"
            type="button" 
            @click="activeSubCategory = sub"
            class="px-4 py-2 rounded-full font-mono text-xs transition-all duration-200"
            :class="activeSubCategory === sub 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 font-semibold' 
              : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'"
          >
            {{ sub }}
          </button>
        </div>
      </div>
    </section>

    <!-- DESIGN PROJECTS GRID -->
    <section id="work" class="flex flex-col gap-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard 
          v-for="project in filteredDesignProjects" 
          :key="project.id" 
          :project="project"
        />
      </div>
    </section>

    <!-- DESIGN PHILOSOPHY CARD -->
    <section class="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex flex-col gap-3 max-w-xl">
        <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">DESIGN PHILOSOPHY</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Hirarki Jelas, Visual Memikat</h2>
        <p class="text-sm md:text-base text-white/70 leading-relaxed">
          Setiap perancangan poster maupun carousel media sosial dibangun dengan prinsip hook visual kuat, keterbacaan tipografi maksimal, serta komposisi warna yang mencerminkan identitas brand klien secara otentik.
        </p>
      </div>
      <a 
        href="https://wa.me/6287754388856?text=Halo%20Mohammad%20Ikhsan,%20saya%20ingin%20konsultasi%20desain."
        target="_blank"
        rel="noopener noreferrer"
        class="px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm shadow-xl shadow-emerald-500/30 transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
      >
        Konsultasi Desain ↗
      </a>
    </section>

  </div>
</template>
