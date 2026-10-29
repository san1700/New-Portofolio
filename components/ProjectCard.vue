<script setup lang="ts">
import type { Project } from '~/data/portfolio'
import { useProjectModal } from '~/composables/useProjectModal'

const props = defineProps<{
  project: Project
}>()

const { openModal } = useProjectModal()
</script>

<template>
  <div 
    @click="openModal(project)"
    @keydown.enter="openModal(project)"
    tabindex="0"
    role="button"
    :aria-label="`Buka detail proyek: ${project.title}`"
    class="group relative flex flex-col rounded-2xl bg-obsidian-900 border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
  >
    <!-- Visual Image Container -->
    <div class="relative w-full aspect-[4/3] overflow-hidden bg-black/40">
      <img 
        :src="project.image" 
        :alt="project.title"
        loading="lazy"
        class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />
      
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

      <!-- Top Badges Pill -->
      <div class="absolute top-3 left-3 flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold tracking-wider text-white">
          <span 
            class="w-2 h-2 rounded-full" 
            :class="project.videoType === 'youtube' ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : (project.isCarousel ? 'bg-amber-400 shadow-[0_0_8px_#FBBF24]' : 'bg-brand-cyan shadow-[0_0_8px_#00F0FF]')"
          ></span>
          {{ project.tag || project.category.toUpperCase() }}
        </span>
      </div>

      <!-- Play / View Icon Indicator on Hover -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div class="w-12 h-12 rounded-full bg-brand-blue/90 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 transform scale-75 group-hover:scale-100 transition-transform">
          <svg v-if="project.videoType === 'video' || project.videoType === 'reel' || project.videoType === 'youtube'" class="w-5 h-5 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <svg v-else-if="project.isCarousel" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </div>
      </div>
    </div>

    <!-- Content Meta -->
    <div class="p-5 flex flex-col flex-1 justify-between gap-3">
      <div>
        <div class="flex items-center justify-between text-xs font-mono text-brand-muted mb-1.5">
          <span>{{ project.client || 'Personal Project' }}</span>
          <span>{{ project.specs?.format || project.aspectRatio || 'Visual' }}</span>
        </div>
        <h3 class="text-base md:text-lg font-bold text-white group-hover:text-brand-accent transition-colors line-clamp-2">
          {{ project.title }}
        </h3>
      </div>

      <!-- Footer Tags -->
      <div v-if="project.tags" class="flex flex-wrap gap-1.5 pt-1">
        <span 
          v-for="t in project.tags.slice(0, 3)" 
          :key="t"
          class="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/70"
        >
          {{ t }}
        </span>
      </div>
    </div>
  </div>
</template>

