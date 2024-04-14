import React from 'react';
import CoverImage from '../../components/coverImage';
import { Heart, Timer } from 'lucide-react';
import { Post } from '@/.velite';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MotionDiv } from '@/components/motion';

const CardComponent = ({ blog,index }: { blog: Post, index:number }) => {
  return (
    <MotionDiv initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.3 * index ,ease:"easeInOut"}} className='@container'>
      <article className="card flex shadow-lg  flex-col @md:flex-row h-full  group justify-between rounded overflow-hidden  bg-card   transition-all duration-300 transform">
        <div className="card_link h-60 @md:w-1/2   ">
          <CoverImage hostedsrc={blog.hostedcover} absolutesrc={blog?.absolutecover?.src} alt={"something helrr"} width={400} height={400} className='w-full -z-10 object-cover h-60 @md:w-1/2  group-hover:h-full dark:group-hover:opacity-30 group-hover:opacity-15 transform duration-300  absolute top-0 ' />
        </div>
        <Link href={blog.permalink} className='@md:flex-1' >
          <div className="card__info ">
            <div className='p-6 group-hover:scale-105 transition-all transform  duration-300'>
              <span className="card__category text-xs    font-semibold tracking-widest uppercase text-gray-600">{blog.tags[0]}</span>
              <h2 className="card__title   text-lg font-medium group-hover:text-accent  ">{blog.title}</h2>
              <p className='card__description mb-2 hidden md:block  text-sm text-gray-600'>
                {blog.description}
              </p>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage src="/bwestwood.webp" alt="Brett Michael Westwood" />
                  <AvatarFallback>BW</AvatarFallback>
                </Avatar>
                <span className="card__by text-sm  font-semibold">
                  <span>by {" "}</span>
                  <span className="text-accent">
                    {blog.authors[0]}
                  </span>
                </span>
              </div>

            </div>
            <div className=" group-hover:opacity-100 @md:hidden text-card-foreground absolute z-20 top-0 w-full h-full  opacity-0 transition-opacity duration-300">
              <div className=' flex w-full  justify-between items-start p-3 mx-auto '>

                <div className="card__clock-info flex text-accent items-center justify-end">
                  <Timer size={15} />
                  <span className="card__time text-sm  ml-1">{blog.metadata.readingTime} min</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </MotionDiv>
  );
}

export default CardComponent;
