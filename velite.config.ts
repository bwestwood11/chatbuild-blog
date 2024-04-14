import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

const headingOptions = {
  behavior: "append",
  content: {
    type: 'element',
    tagName: 'span',
    properties: {
      className: ['bravo'],
    },
    children: [
      {
        type: 'element',
        tagName: 'svg',
        properties: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '24',
          height: '24',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: ['html-link-svg']
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: {
              d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
            },
          },
          {
            type: 'element',
            tagName: 'path',
            properties: {
              d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
            },
          },
        ]
      }
    ]
  }
}

const meta = s
  .object({
    title: s.string().optional(),
    description: s.string().optional(),
    keywords: s.array(s.string()).optional()
  })
  .default({})

const categories = [
  "help",
  "news",
  "updates",
  "announcements",
  "general"
] as const



const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug('post'),
      date: s.isodate(),
      updated: s.isodate().optional(),
      absolutecover: s.image().optional(),
      hostedcover:s.string().optional(),
      youtube_video:s.string().optional(),
      authors: s.array(s.string()),
      description: s.string().max(999).optional(),
      draft: s.boolean().default(false),
      meta: meta,
      tags: s.array(s.string()).default([]),
      toc: s.toc(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: s.markdown(),
      body: s.mdx(),
      category: s.enum(categories)
    })
    .transform(data => ({ ...data, permalink: `blog/${data.slug}` }))
})
const codeOptions = {
  theme: "github-dark"
};
export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: { posts },
  mdx: { rehypePlugins: [[rehypeAutolinkHeadings, headingOptions], rehypeSlug, [rehypePrettyCode, codeOptions]] }
})
