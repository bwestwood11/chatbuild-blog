import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const basePath = process.env.SITE_URL || "https://blog.chatbuild.io/";
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${basePath}/sitemap.xml`,
  }
}