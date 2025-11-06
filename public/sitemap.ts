// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Update this with your actual domain
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://festiro.vercel.app'
  
  // Current date for fresh content
  const now = new Date()
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/promotions`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/learning`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.50,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.60,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.30,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.30,
    },
  ]

  // Dynamic festival pages (example - replace with actual data from DB/API)
  const majorFestivals = [
    { slug: 'diwali-2025', date: '2025-10-20' },
    { slug: 'holi-2026', date: '2026-03-14' },
    { slug: 'dussehra-2025', date: '2025-10-02' },
    { slug: 'ganesh-chaturthi-2025', date: '2025-08-27' },
    { slug: 'navratri-2025', date: '2025-09-22' },
    { slug: 'christmas-2025', date: '2025-12-25' },
    { slug: 'eid-ul-fitr-2026', date: '2026-03-31' },
    { slug: 'guru-nanak-jayanti-2025', date: '2025-11-05' },
  ]

  const festivalPages: MetadataRoute.Sitemap = majorFestivals.map((festival) => ({
    url: `${baseUrl}/festivals/${festival.slug}`,
    lastModified: new Date(festival.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Learning lesson pages (example - replace with actual lesson IDs)
  const lessonCategories = [
    'major-festivals',
    'lesser-known',
    'astrology-muhurat',
    'tribal-regional',
    'harvest-seasonal',
    'spiritual-mystical',
  ]

  const lessonPages: MetadataRoute.Sitemap = lessonCategories.map((category) => ({
    url: `${baseUrl}/learning/category/${category}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.70,
  }))

  // Combine all pages
  return [...staticPages, ...festivalPages, ...lessonPages]
}
