import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import RenderMdx, { mdxComponents } from '@/components/mdxComponents'


 
export const generateStaticParams = async () =>
  allBlogs.map((post) => ({ slug: post._raw.flattenedPath }))
 
export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> => {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug)
 
  if (!blog) return 
 
  return {
    title: blog.title,
    description: blog.description,
  }
}
 
export default function Post({ params }: { params: { slug: string } }) {
  const blog = allBlogs.find((post) => post._raw.flattenedPath === params.slug)
  if (!blog) notFound()
  const MDXContent = useMDXComponent(blog.body.code)
  return (
    <article className="mx-auto max-w-xl py-8  prose lg:prose-xl">
      <div className="mb-8 text-center">
        <time dateTime={blog.date} className="mb-1 text-xs text-gray-600">
          {new Date(blog.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </div>
      <RenderMdx blog={blog} />
    </article>
  )
}