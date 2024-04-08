import { posts } from "@/.velite";
import { MetadataRoute } from "next";
 

export default function sitemap(): MetadataRoute.Sitemap {
  const basePath = process.env.SITE_URL || "https://blog.chatbuild.io/";
  const postsSiteMap = posts.map((post) => ({
    url: `${basePath}${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  } as const))

  return [
    {
      url: `${basePath}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...postsSiteMap
  ];
}