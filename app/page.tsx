import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { ModeToggle } from '@/components/toggle-button'
import {  posts } from "#site/content"

export default function Home() {
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Posts</h1>
      <ModeToggle />
      {posts.map((blog) => (
        <article key={blog.slug} className="mb-8">
          <h2 className="text-xl">
            <Link href={blog.slug} className="text-blue-700 hover:text-blue-900">
              {blog.title}
            </Link>
          </h2>
          <time
            dateTime={blog.date}
            className="mb-2 block text-xs text-gray-600"
          >
            {new Date(blog.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {blog.description}
          </p>
        </article>
      ))}
    </div>
  )
}
