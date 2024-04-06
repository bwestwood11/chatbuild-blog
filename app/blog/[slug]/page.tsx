import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdxComponents'
import { FormatTime } from '@/lib/utils'
import Image from 'next/image'
import { posts } from "#site/content"
import { DashboardTableOfContents } from '@/components/mdx/toc'
import ShareModal from '@/components/share-modal'

type Props = {
  params: {
    slug: string
  }
}

function getPageBySlug(slug: string) {
  console.log(slug)
  return posts.find(post => post.slug.split("/").pop() === slug)
}

export default function Post({ params }: { params: { slug: string } }) {
  const blog = getPageBySlug(params.slug)
  if (!blog) notFound()
  return (
    <div className='flex container max-md:px-8 py-8 scroll-m-10 w-full  '>
      <article className="mx-auto flex-1  max-w-3xl  w-full flex flex-col gap-3  ">
        <div className="mb-4 text-left text-foreground">
          <ShareModal absoluteLink='https://www.google.com'/>
          <time dateTime={blog.date} className="mb-1 text-xs text-gray-600">
            {FormatTime(blog.date)}
          </time>
          <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
          <div className='flex gap-3 items-center ' >
            {/* <span>{blog.timeToRead.minutes.toFixed(0)} minutes read</span> */}
            <Image width={30} height={30} className='rounded-full bg-foreground object-cover size-8 aspect-square ' alt="image" src={"https://images.unsplash.com/photo-1712013839230-15e7928efdab?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
            <div className='flex flex-col '>
              <span>
                {blog.authors[0]}
              </span>
              <span className="text-sm text-gray-600">
                {blog.metadata.readingTime} minutes read
              </span>
            </div>
          </div>
        </div>
        <div className=' w-full aspect-video block relative  bg-foreground'>
          {blog.absolutecover && <Image priority fill
            sizes="(min-width: 808px) 50vw, 100vw"
            src={blog.absolutecover.src} blurDataURL={blog.absolutecover.blurDataURL} alt='image' className='w-full h-full object-cover mb-3 ' />}
          {blog.hostedcover && <Image priority fill
            sizes="(min-width: 808px) 50vw, 100vw"
            src={blog.hostedcover} alt='image' className='w-full h-full object-cover mb-3 ' />}
        </div>
        <Mdx code={blog.body} />
        <hr />
        <div>{blog.tags?.map(tag => <span key={tag}>#{tag}</span>)}</div>
      </article>


      <div
        className="border-[1px]  xl:block hidden w-[300px] py-4 border-solid border-dark dark:border-light text-dark dark:text-light rounded-lg  p-4 xl:sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
      >
        <p className="text-lg font-semibold capitalize cursor-pointer font-league tracking-widest  ">
          TABLE OF CONTENT
        </p>
        <ul className="mt-4 font-in text-sm ">
        <DashboardTableOfContents toc={blog.toc} />
        </ul>
      </div>
    </div>
  )
}
export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const post = getPageBySlug(params.slug)

  if (!post) {
    return {}
  }


  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      // TODO add absolute url
      url: post.slug,
      images: post.absolutecover ? [
        {
          url: post.absolutecover.src,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.absolutecover ? [
        {
          url: post.absolutecover.src,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
  }
}

export function generateStaticParams(): Props['params'][] {
  return posts.map(post => ({ slug: post.slug }))
}