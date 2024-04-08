import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/mdxComponents'
import { AbsoluteUrl, FormatTime } from '@/lib/utils'
import Image from 'next/image'
import { posts } from "#site/content"
import { DashboardTableOfContents } from '@/components/mdx/toc'
import { TracingBeam } from '@/components/ui/tracing-ray'
import { MotionDiv, MotionHeading, MotionParagraph, MotionSpan } from '@/components/motion'
import Toolbar from './_components/Toolbar'
import { loadingVariants } from '@/lib/animations'

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
          <time dateTime={blog.date} className="mb-1 text-xs text-gray-600">
            {FormatTime(blog.date)}
          </time>
          <MotionHeading initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-3">{blog.title}</MotionHeading>
          <div className='flex gap-3 items-center ' >
            {/* <span>{blog.timeToRead.minutes.toFixed(0)} minutes read</span> */}
            <Image width={30} height={30} className='rounded-full bg-foreground object-cover size-8 aspect-square ' alt="image" src={"https://images.unsplash.com/photo-1712013839230-15e7928efdab?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
            <div className='flex flex-col '>
              <MotionSpan initial="initial"
                animate="animate"
                exit="exit"
                variants={loadingVariants}>
                {blog.authors[0]}
              </MotionSpan>
              <MotionSpan initial="initial"
                animate="animate"
                exit="exit"
                variants={loadingVariants} className="text-sm text-gray-600">
                {blog.metadata.readingTime} minutes read
              </MotionSpan>
            </div>
          </div>
        </div>
        <MotionDiv initial="initial"
                animate="animate"
                exit="exit"
                variants={loadingVariants} className=' w-full aspect-video block relative  bg-foreground'>
          {blog.absolutecover && <Image priority fill
            sizes="(min-width: 808px) 50vw, 100vw"
            src={blog.absolutecover.src} blurDataURL={blog.absolutecover.blurDataURL} alt='image' className='w-full h-full object-cover mb-3 ' />}
          {blog.hostedcover && <Image priority fill
            sizes="(min-width: 808px) 50vw, 100vw"
            src={blog.hostedcover} alt='image' className='w-full h-full object-cover mb-3 ' />}
        </MotionDiv>
        <TracingBeam>
          <Mdx code={blog.body} />
        </TracingBeam >
        <hr />
        <div>{blog.tags?.map(tag => <span key={tag}>#{tag}</span>)}</div>
        <Toolbar/>
      </article>


      <div
        className="border-[1px]  xl:block hidden w-[300px] py-4 border-solid border-dark dark:border-light text-dark dark:text-light rounded-lg  p-4 xl:sticky top-20 max-h-[80vh] overflow-hidden overflow-y-auto"
      >
        <div className='flex gap-3'>
         {"TABLE OF CONTENT".split(" ").map((el, i) => (
        <MotionParagraph
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: i / 10
          }}
          className='text-lg font-semibold capitalize cursor-pointer font-league tracking-widest'
          key={i}
        >
          {el}{"  "}
        </MotionParagraph>
      ))}
      </div>
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
      url: AbsoluteUrl(post.slug),
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