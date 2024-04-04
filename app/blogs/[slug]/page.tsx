import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import RenderMdx, { mdxComponents } from '@/components/mdxComponents'
import { FormatTime } from '@/lib/utils'
import Image from 'next/image'
import { InvisibleHeading } from '@/components/mdx/InvisibleHeading'



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
  return (
    <div className='flex container max-md:px-8 py-8 scroll-m-10 w-full  '>
      <article className="mx-auto flex-1  max-w-3xl  w-full  ">
        <div className="mb-8 text-left text-foreground">
          <time dateTime={blog.date} className="mb-1 text-xs text-gray-600">
            {FormatTime(blog.date)}
          </time>
          <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
          <div className='flex gap-3 items-center ' >
            {/* <span>{blog.timeToRead.minutes.toFixed(0)} minutes read</span> */}
              <Image width={30} height={30} className='rounded-full object-cover size-8 aspect-square ' alt="image" src={"https://images.unsplash.com/photo-1712013839230-15e7928efdab?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
          <div className='flex flex-col '>
            <span>
            {blog.author}
            </span>
            <span className="text-sm text-gray-600">
              {blog.timeToRead.minutes.toFixed(0)} minutes read
            </span>
          </div>
          </div>
        </div>
        {blog.poster &&  <Image width={1000} height={1000} src={blog.poster} alt='image' className='w-full object-cover mb-3' />}
       
        <RenderMdx blog={blog} />

        <hr />
        <div>{blog.tags?.map(tag => <span>#{tag}</span>)}</div>
      </article>


      <div
        className="border-[1px]  xl:block hidden w-[300px] py-4 border-solid border-dark dark:border-light text-dark dark:text-light rounded-lg  p-4 xl:sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
      > 
        <p className="text-lg font-semibold capitalize cursor-pointer font-league tracking-widest  ">
          TABLE OF CONTENT
        </p>
        <ul className="mt-4 font-in text-sm ">
          {blog.toc.map((heading: any) => {
            return (
              <li key={`#${heading.slug}`} className="py-1">
                <a
                  href={`#${heading.slug}`}
                  data-level={heading.level}
                  className="data-[level=two]:pl-0 text-gray-500 data-[level=two]:text-white  data-[level=two]:pt-1
                                       data-[level=two]:border-t border-solid border-dark/40
                                       data-[level=three]:pl-2
                                       sm:data-[level=three]:pl-4
                                       flex items-center justify-start
                                       "
                >
                  {heading.level === "three" ? (
                    <span className="flex w-1 h-1 rounded-full bg-dark mr-2">
                      &nbsp;
                    </span>
                  ) : null}
                  <span className=" hover:text-primary">{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}