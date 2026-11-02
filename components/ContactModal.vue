<script setup lang="ts">
import { ref } from 'vue'
import { useProjectModal } from '~/composables/useProjectModal'

const { isContactModalOpen, closeContactModal } = useProjectModal()

const name = ref('')
const email = ref('')
const message = ref('')
const isSending = ref(false)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!name.value || !email.value || !message.value) return

  // Format mailto link
  const subject = encodeURIComponent(`Project Inquiry: ${name.value}`)
  const body = encodeURIComponent(
    `Nama: ${name.value}\nEmail: ${email.value}\n\nPesan:\n${message.value}`
  )
  window.location.href = `mailto:iechantwiranata@gmail.com?subject=${subject}&body=${body}`

  closeContactModal()
}
</script>

<template>
  <div 
    id="contact-modal" 
    class="modal-overlay" 
    :class="{ active: isContactModalOpen }"
    role="dialog" 
    aria-modal="true" 
    :aria-hidden="!isContactModalOpen"
    @click.self="closeContactModal"
  >
    <div class="modal-container modal-contact">
      <button class="modal-close" id="close-contact-modal" aria-label="Close modal" @click="closeContactModal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="modal-body">
        <span class="text-accent uppercase letter-spacing font-sm font-semibold">GET IN TOUCH</span>
        <h2 class="modal-title mt-xs">Let's <span class="text-accent">Talk</span></h2>
        <p class="text-muted mt-xs mb-md">Have an exciting project or idea? Leave a message and let's collaborate.</p>
        <form id="contact-form" class="modal-form" @submit="handleSubmit">
          <div class="form-group">
            <label for="contact-name">Nama</label>
            <input type="text" id="contact-name" name="name" v-model="name" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label for="contact-email">Email</label>
            <input type="email" id="contact-email" name="email" v-model="email" placeholder="name@example.com" required>
          </div>
          <div class="form-group">
            <label for="contact-message">Pesan</label>
            <textarea id="contact-message" name="message" v-model="message" rows="4"
              placeholder="Ceritakan tentang proyek Anda..." required></textarea>
          </div>
          <button type="submit" id="contact-submit-btn" class="btn btn-primary rounded-pill w-full mt-sm" :disabled="isSending">
            <span>Send Message via Email</span>
          </button>
        </form>

        <div class="contact-divider flex items-center gap-sm my-md">
          <span class="divider-line"></span>
          <span class="divider-text text-muted font-sm">OR</span>
          <span class="divider-line"></span>
        </div>

        <a href="https://wa.me/6281807882493?text=Halo%20Ikhsan,%20saya%20tertarik%20untuk%20mendiskusikan%20proyek%20bersama%20Anda."
          target="_blank" rel="noopener noreferrer"
          class="btn btn-whatsapp rounded-pill w-full flex items-center justify-center gap-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z" />
          </svg>
          <span>Chat Directly on WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
</template>
