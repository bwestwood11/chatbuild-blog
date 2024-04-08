import Link from 'next/link'
import { ModeToggle } from '@/components/toggle-button'
import CardComponent from './_components/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { categories } from '@/lib/constants'
import { getBlogByCategory } from '@/lib/blogsUtils'
import { MotionDiv } from '@/components/motion'
import { loadingVariants } from '@/lib/animations'

export default function Home() {
  return (
    <div className="mx-auto container px-5 xl:px-20  py-8">
      <Tabs defaultValue={categories[0]} >
        <section className=' py-10'>
          <h1 className="text-left text-3xl font-black">Posts</h1>
          <p className=' text-gray-600 mb-10'>Latest news and updates and Help from Chatbuild Ai</p>
          <TabsList >
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className='capitalize'>{category}</TabsTrigger>
            ))}
          </TabsList>
        </section>
        {categories.map((category) => (
          <TabsContent value={category} key={category}>
            <PostsGrid category={category} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}


const PostsGrid = ({ category }: { category: categories }) => {
  const posts = getBlogByCategory(category)

  if (posts.length <= 0) {
    return (
      <div className='post-grid' >
        <MotionDiv initial="initial"
          animate="animate"
          exit="exit"
          variants={loadingVariants} className='flex flex-col items-center justify-center py-20 '>
          <h1 className="text-left text-3xl font-black">No posts found</h1>
          <p className=' text-gray-600 mb-4'>Latest news and updates and Help from Chatbuild Ai</p>
        </MotionDiv>
      </div>)
  }


  return (
    <div className='post-grid' >
      {posts.map((blog, index) => (
        <CardComponent index={index} key={blog.slug} blog={blog} />
      ))}
    </div>
  )
}

