import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID || 'your-project-id',
    dataset: process.env.NUXT_SANITY_DATASET || 'production'
  }
})
