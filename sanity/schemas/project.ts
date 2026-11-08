// sanity/schemas/project.ts
// Schema definisi projek untuk Sanity Studio (Dashboard CMS)

export default {
  name: 'project',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('Judul projek wajib diisi')
    },
    {
      name: 'slug',
      title: 'Slug / URL Key',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'category',
      title: 'Primary Category',
      type: 'string',
      options: {
        list: [
          { title: 'Video Editing', value: 'Video Editing' },
          { title: 'Videography', value: 'Videography' },
          { title: 'UI/UX Design', value: 'UI/UX Design' },
          { title: 'Brand Identity', value: 'Brand Identity' },
          { title: 'Motion Graphic', value: 'Motion Graphic' },
          { title: 'Drone & Aerial', value: 'Drone & Aerial' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subCategory',
      title: 'Sub-Category / Discipline Tag',
      type: 'string',
      description: 'Contoh: Videography & Drone, Reels & Short Form, UI/UX & Web, Poster Design'
    },
    {
      name: 'client',
      title: 'Client / Event / Brand Name',
      type: 'string',
      description: 'Nama klien atau instansi (contoh: SANS DRONE, DPP IMABA, Maslahah Ecosystem)'
    },
    {
      name: 'description',
      title: 'Short Summary / Description',
      type: 'text',
      rows: 3,
      description: 'Ringkasan singkat 2-3 kalimat mengenai projek ini'
    },
    {
      name: 'image',
      title: 'Cover Image / Thumbnail',
      type: 'image',
      options: {
        hotspot: true // Memungkinkan cropping fokus visual otomatis
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'videoType',
      title: 'Video Format',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube Embed (Horizontal / 16:9)', value: 'youtube' },
          { title: 'Vertical Reel / TikTok (9:16)', value: 'reels' },
          { title: 'Self-hosted MP4 Video', value: 'mp4' },
          { title: 'None (Design Only)', value: 'none' }
        ],
        layout: 'radio'
      },
      initialValue: 'none'
    },
    {
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'ID video YouTube jika videoType adalah YouTube (contoh: dQw4w9WgXcQ dari youtube.com/watch?v=dQw4w9WgXcQ)'
    },
    {
      name: 'videoUrl',
      title: 'Direct Video URL',
      type: 'url',
      description: 'Link file video MP4 atau tautan stream langsung (opsional)'
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Landscape Standard)', value: '16:9' },
          { title: '9:16 (Vertical Story/Reels)', value: '9:16' },
          { title: '1:1 (Square)', value: '1:1' },
          { title: '4:5 (Instagram Portrait)', value: '4:5' }
        ]
      },
      initialValue: '16:9'
    },
    {
      name: 'tags',
      title: 'Tags / Pill Badges',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Badge kecil seperti [Drone Pilot], [Colorist], [Figma], [CapCut Pro]'
    },
    {
      name: 'specs',
      title: 'Production Specs',
      type: 'object',
      fields: [
        { name: 'software', title: 'Software Used', type: 'string', description: 'Contoh: DaVinci Resolve, CapCut Pro' },
        { name: 'format', title: 'Delivery Format', type: 'string', description: 'Contoh: 4K UHD 60fps, 1080x1920' },
        { name: 'scope', title: 'Scope of Work', type: 'string', description: 'Contoh: Direction, Drone Piloting, Editing' }
      ]
    },
    {
      name: 'order',
      title: 'Display Priority Order',
      type: 'number',
      description: 'Nomor urutan tampil di website (angka lebih kecil = tampil paling awal)',
      initialValue: 10
    },
    {
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Tampilkan projek ini di kurasi utama beranda',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    }
  }
}

