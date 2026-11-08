// sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'SANMHMD Studio',

  projectId: process.env.NUXT_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NUXT_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
