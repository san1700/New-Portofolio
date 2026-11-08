// composables/useProjects.ts
// Universal composable: Ambil data dari Sanity.io jika terkonfigurasi,
// atau otomatis fallback ke data lokal (data/portfolio.ts) jika belum.

import { ref, computed } from 'vue'
import { 
  projectsData as localProjects, 
  cinemaProjects as localCinemaProjects,
  designProjects as localDesignProjects,
  type Project 
} from '~/data/portfolio'

export const useProjects = () => {
  const sanityConfig = useRuntimeConfig().public?.sanity as { projectId?: string } | undefined
  const isSanityConfigured = computed(() => {
    const pid = sanityConfig?.projectId
    return Boolean(pid && pid !== 'demo-project' && pid !== 'your-project-id' && pid !== '')
  })

  const projects = ref<Project[]>(localProjects)
  const isPending = ref(false)
  const fetchError = ref<Error | null>(null)

  const cinemaProjects = computed(() => {
    if (!isSanityConfigured.value) return localCinemaProjects
    return projects.value.filter(p => {
      const cat = p.category?.toLowerCase() || ''
      const sub = p.subCategory?.toLowerCase() || ''
      return cat.includes('video') || cat.includes('cinema') || cat.includes('drone') || cat.includes('motion') ||
             sub.includes('video') || sub.includes('drone') || sub.includes('reel') || sub.includes('photo')
    })
  })

  const designProjects = computed(() => {
    if (!isSanityConfigured.value) return localDesignProjects
    return projects.value.filter(p => {
      const cat = p.category?.toLowerCase() || ''
      const sub = p.subCategory?.toLowerCase() || ''
      return cat.includes('design') || cat.includes('ui/ux') || cat.includes('brand') || cat.includes('identity') ||
             sub.includes('design') || sub.includes('poster') || sub.includes('carousel') || sub.includes('editorial')
    })
  })

  const loadProjects = async () => {
    if (!isSanityConfigured.value) {
      // Gunakan data statis lokal jika Sanity belum di-set
      projects.value = localProjects
      return
    }

    try {
      isPending.value = true
      const sanity = useSanity()
      
      const query = groq`*[_type == "project"] | order(order asc, _createdAt desc) {
        _id,
        title,
        category,
        subCategory,
        client,
        description,
        "image": image.asset->url,
        videoType,
        youtubeId,
        videoUrl,
        aspectRatio,
        tags,
        specs,
        isFeatured,
        order
      }`

      const sanityItems = await sanity.fetch<any[]>(query)

      if (sanityItems && sanityItems.length > 0) {
        projects.value = sanityItems.map((item, idx) => ({
          id: item._id || idx + 1000,
          title: item.title,
          category: item.category || 'Creative Work',
          subCategory: item.subCategory || '',
          client: item.client || '',
          description: item.description || '',
          image: item.image || '/images/project-sans-drone.webp',
          videoType: item.videoType || 'none',
          youtubeId: item.youtubeId || '',
          videoUrl: item.videoUrl || '',
          aspectRatio: item.aspectRatio || '16:9',
          tags: item.tags || [],
          specs: item.specs || {}
        }))
      } else {
        // Jika database Sanity masih kosong, fallback ke data lokal
        projects.value = localProjects
      }
    } catch (err: any) {
      console.warn('[useProjects] Menggunakan data lokal fallback:', err?.message || err)
      fetchError.value = err
      projects.value = localProjects
    } finally {
      isPending.value = false
    }
  }

  return {
    projects,
    cinemaProjects,
    designProjects,
    isPending,
    fetchError,
    isSanityConfigured,
    loadProjects
  }
}
