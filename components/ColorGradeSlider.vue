<script setup lang="ts">
import { ref } from 'vue'

interface Preset {
  id: string
  name: string
  raw: string
  graded: string
}

const presets: Preset[] = [
  {
    id: 'urban',
    name: 'Urban Night (Sony S-Log3)',
    raw: '/images/grade-urban-raw.webp',
    graded: '/images/grade-urban-graded.webp'
  },
  {
    id: 'drone',
    name: 'Sans Aerial (D-Log M)',
    raw: '/images/grade-sans-drone-raw.webp',
    graded: '/images/grade-sans-drone-graded.webp'
  },
  {
    id: 'court',
    name: 'Moot Court (Interior)',
    raw: '/images/grade-court-raw.webp',
    graded: '/images/grade-court-graded.webp'
  }
]

const activePreset = ref(presets[0])
const splitPos = ref(50) // percentage 0 - 100
const isDragging = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const updateSplit = (clientX: number) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = clientX - rect.left
  const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
  splitPos.value = pct
}

const onMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  updateSplit(e.clientX)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  updateSplit(e.clientX)
}

const onMouseUp = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

const onTouchStart = (e: TouchEvent) => {
  isDragging.value = true
  updateSplit(e.touches[0].clientX)
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  updateSplit(e.touches[0].clientX)
}

const onTouchEnd = () => {
  isDragging.value = false
}
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <!-- Preset selector tabs -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <button 
        v-for="preset in presets" 
        :key="preset.id"
        type="button" 
        @click="activePreset = preset"
        class="px-4 py-2 rounded-full font-mono text-xs md:text-sm transition-all duration-200"
        :class="activePreset.id === preset.id 
          ? 'bg-brand-blue text-white shadow-lg shadow-blue-600/30 font-semibold' 
          : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'"
      >
        {{ preset.name }}
      </button>
    </div>

    <!-- Interactive Comparison Stage -->
    <div 
      ref="containerRef"
      class="relative w-full aspect-video md:aspect-[21/9] max-h-[520px] rounded-2xl overflow-hidden border border-white/15 bg-black select-none shadow-2xl cursor-col-resize"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <!-- Base (Graded Rec.709) Layer - Full width -->
      <img 
        :src="activePreset.graded" 
        :alt="`${activePreset.name} Graded`"
        class="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />

      <!-- Left (RAW / LOG) Clipped Layer -->
      <div 
        class="absolute inset-0 overflow-hidden"
        :style="{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }"
      >
        <img 
          :src="activePreset.raw" 
          :alt="`${activePreset.name} RAW LOG`"
          class="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
      </div>

      <!-- Handle Divider Line & Thumb -->
      <div 
        class="absolute top-0 bottom-0 pointer-events-none"
        :style="{ left: `${splitPos}%`, transform: 'translateX(-50%)' }"
      >
        <!-- Vertical Line -->
        <div class="w-0.5 h-full bg-gradient-to-b from-white/20 via-white to-brand-cyan shadow-[0_0_12px_#00F0FF]"></div>
        
        <!-- Center Circular Thumb -->
        <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-obsidian-900/90 border-2 border-brand-cyan shadow-xl shadow-cyan-400/40 flex items-center justify-center text-white backdrop-blur-md">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/></svg>
        </div>
      </div>

      <!-- Left Badge: RAW LOG -->
      <div class="absolute top-4 left-4 pointer-events-none">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90">
          <span class="w-2 h-2 rounded-full bg-gray-400"></span>
          RAW (S-LOG3 / FLAT)
        </span>
      </div>

      <!-- Right Badge: GRADED -->
      <div class="absolute top-4 right-4 pointer-events-none">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/30 text-[11px] font-mono text-white">
          <span class="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#00F0FF]"></span>
          GRADED (REC.709)
        </span>
      </div>
    </div>

    <!-- Instruction hint -->
    <p class="text-center font-mono text-xs text-brand-muted">
      Geser pegangan garis tengah secara horizontal untuk membandingkan grading warna.
    </p>
  </div>
</template>

