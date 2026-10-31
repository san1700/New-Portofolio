// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  experimental: {
    appManifest: false
  },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      title: 'SANMHMD | Mohammad Ikhsan - Video Editor & Visual Creator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portofolio resmi Mohammad Ikhsan (SANMHMD) — Creative Enthusiast, Video Editor, Videographer, dan Visual Creator. Spesialis Video Reels, Videografi Sinematik, dan Brand Identity.' },
        { name: 'author', content: 'Mohammad Ikhsan (SANMHMD)' },
        { name: 'theme-color', content: '#050506' },
        
        // Open Graph / WhatsApp / Facebook / LinkedIn
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://sanmhmd.vercel.app/' },
        { property: 'og:site_name', content: 'SANMHMD Portfolio' },
        { property: 'og:title', content: 'SANMHMD | Mohammad Ikhsan - Video Editor & Visual Creator' },
        { property: 'og:description', content: 'Portofolio resmi Mohammad Ikhsan (SANMHMD) — Creative Enthusiast, Video Editor, Videographer, dan Visual Creator. Spesialis Video Reels, Videografi Sinematik, dan Brand Identity.' },
        { property: 'og:image', content: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2' },
        { property: 'og:image:secure_url', content: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1080' },
        { property: 'og:image:height', content: '1440' },
        { property: 'og:image:alt', content: 'SANMHMD | Mohammad Ikhsan - Video Editor & Visual Creator' },

        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://sanmhmd.vercel.app/' },
        { name: 'twitter:title', content: 'SANMHMD | Mohammad Ikhsan - Video Editor & Visual Creator' },
        { name: 'twitter:description', content: 'Portofolio resmi Mohammad Ikhsan (SANMHMD) — Creative Enthusiast, Video Editor, Videographer, dan Visual Creator.' },
        { name: 'twitter:image', content: 'https://sanmhmd.vercel.app/images/og-cover.jpg?v=2' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' },
        { rel: 'canonical', href: 'https://sanmhmd.vercel.app/' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap' }
      ]
    }
  },

  nitro: {
    preset: 'vercel'
  }
})

