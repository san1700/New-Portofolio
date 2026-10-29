<script setup lang="ts">
import { ref } from 'vue'
import { cinemaProjects, type Project } from '~/data/portfolio'

useSeoMeta({
  title: 'Cinema & Media Track | Mohammad Ikhsan',
  description: 'Eksplorasi karya videografi, drone 4K, short-form reels, dan retouching foto sinematik oleh Mohammad Ikhsan.',
  ogImage: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2',
})

const activeSubCategory = ref('Semua')
const subCategories = ['Semua', 'Reels & Short Form', 'Videography & Drone']

const filteredCinemaProjects = computed(() => {
  if (activeSubCategory.value === 'Semua') {
    return cinemaProjects
  }
  return cinemaProjects.filter((p: Project) => p.subCategory === activeSubCategory.value)
})
</script>

<template>
  <div class="flex flex-col gap-24 md:gap-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto w-full">
    
    <!-- SUBPAGE HERO -->
    <section class="flex flex-col gap-6 pt-6">
      <div class="flex items-center gap-2 text-xs font-mono text-brand-muted">
        <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
        <span>/</span>
        <span class="text-brand-blue">Cinema &amp; Media Track</span>
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="flex flex-col gap-3">
          <span class="text-xs font-mono font-bold tracking-widest uppercase text-brand-cyan">TRACK 01 // AUDIO-VISUAL</span>
          <h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Cinema &amp; Media</h1>
          <p class="max-w-xl text-base md:text-lg text-white/70">
            Karya video editing bertempo cepat, footage aerial 4K spektakuler, serta color grading filmis yang membangkitkan suasana emosional.
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
              ? 'bg-brand-blue text-white shadow-lg shadow-blue-600/30 font-semibold' 
              : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'"
          >
            {{ sub }}
          </button>
        </div>
      </div>
    </section>

    <!-- CINEMA PROJECTS GRID -->
    <section id="work" class="flex flex-col gap-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard 
          v-for="project in filteredCinemaProjects" 
          :key="project.id" 
          :project="project"
        />
      </div>
    </section>

    <!-- COLOR GRADING SECTION -->
    <section class="flex flex-col gap-8 pt-8 border-t border-white/10">
      <div class="flex flex-col gap-2 text-center items-center">
        <span class="text-xs font-mono uppercase tracking-widest text-brand-cyan font-semibold">COLOR GRADING &amp; SCIENCE</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Interactive Look Comparison</h2>
        <p class="max-w-md text-xs md:text-sm text-white/60">
          Bandingkan hasil log flat sensor camera sebelum dan sesudah color grading DaVinci Resolve.
        </p>
      </div>

      <ColorGradeSlider />
    </section>

  </div>
</template>
