import { ref, computed } from 'vue'
import { projectsData, type Project } from '~/data/portfolio'

const isModalOpen = ref(false)
const selectedProject = ref<Project | null>(null)
const currentSlide = ref(0)
const isShowreelModalOpen = ref(false)
const isContactModalOpen = ref(false)

export const useProjectModal = () => {
  const openModal = (projectOrId: Project | number) => {
    let p: Project | undefined
    if (typeof projectOrId === 'number') {
      p = projectsData.find(item => item.id === projectOrId)
    } else {
      p = projectOrId
    }

    if (!p) return
    selectedProject.value = p
    currentSlide.value = 0
    isModalOpen.value = true

    if (typeof document !== 'undefined') {
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
  }

  const closeModal = () => {
    isModalOpen.value = false
    selectedProject.value = null
    currentSlide.value = 0

    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }

  const openShowreelModal = () => {
    isShowreelModalOpen.value = true
    if (typeof document !== 'undefined') {
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
  }

  const closeShowreelModal = () => {
    isShowreelModalOpen.value = false
    if (typeof document !== 'undefined') {
      const showreelVideo = document.getElementById('showreel-video') as HTMLVideoElement | null
      if (showreelVideo) {
        showreelVideo.pause()
      }
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }

  const openContactModal = () => {
    isContactModalOpen.value = true
    if (typeof document !== 'undefined') {
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
  }

  const closeContactModal = () => {
    isContactModalOpen.value = false
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
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
    isShowreelModalOpen,
    isContactModalOpen,
    openModal,
    closeModal,
    openShowreelModal,
    closeShowreelModal,
    openContactModal,
    closeContactModal,
    nextSlide,
    prevSlide,
    goToSlide
  }
}
