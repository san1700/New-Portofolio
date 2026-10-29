import { ref, computed } from 'vue'
import type { Project } from '~/data/portfolio'

const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)
const currentSlide = ref(0)

export const useProjectModal = () => {
  const openModal = (project: Project) => {
    selectedProject.value = project
    currentSlide.value = 0
    isModalOpen.value = true
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeModal = () => {
    isModalOpen.value = false
    selectedProject.value = null
    currentSlide.value = 0
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const slides = computed(() => {
    if (!selectedProject.value) return []
    if (selectedProject.value.slides && selectedProject.value.slides.length > 0) {
      return selectedProject.value.slides
    }
    if (selectedProject.value.image) {
      return [selectedProject.value.image]
    }
    return []
  })

  const nextSlide = () => {
    if (slides.value.length <= 1) return
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }

  const prevSlide = () => {
    if (slides.value.length <= 1) return
    currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
  }

  const goToSlide = (idx: number) => {
    if (idx >= 0 && idx < slides.value.length) {
      currentSlide.value = idx
    }
  }

  return {
    isModalOpen,
    selectedProject,
    currentSlide,
    slides,
    openModal,
    closeModal,
    nextSlide,
    prevSlide,
    goToSlide
  }
}
