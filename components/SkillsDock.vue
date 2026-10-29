<script setup lang="ts">
interface SkillTool {
  name: string
  logo: string
  color?: string
}

const tools: SkillTool[] = [
  { name: 'Premiere Pro', logo: '/images/logo-premiere.webp' },
  { name: 'CapCut Pro', logo: '/images/logo-capcut.webp' },
  { name: 'After Effects', logo: '/images/logo-premiere.webp' },
  { name: 'DaVinci Resolve', logo: '/images/logo-premiere.webp' },
  { name: 'Sony Alpha', logo: '/images/logo-photoshop.png' },
  { name: 'DJI Drone', logo: '/images/logo-photoshop.png' },
  { name: 'Figma', logo: '/images/logo-canva.png' },
  { name: 'Photoshop', logo: '/images/logo-photoshop.png' },
  { name: 'Illustrator', logo: '/images/logo-coreldraw.png' },
  { name: 'Lightroom', logo: '/images/logo-lightroom.png' },
  { name: 'CorelDraw', logo: '/images/logo-coreldraw.png' },
  { name: 'Canva Pro', logo: '/images/logo-canva.png' },
]
</script>

<template>
  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 w-full">
    <div 
      v-for="tool in tools" 
      :key="tool.name"
      class="group flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-xl bg-obsidian-900 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 text-center min-h-[72px] sm:min-h-[96px]"
    >
      <div class="w-6 h-6 sm:w-9 sm:h-9 mb-1.5 sm:mb-2 flex items-center justify-center">
        <img 
          :src="tool.logo" 
          :alt="tool.name"
          class="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
        />
      </div>
      <span class="text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white transition-colors line-clamp-1">
        {{ tool.name }}
      </span>
    </div>
  </div>
</template>
