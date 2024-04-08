"use client"
import ShareModal from '@/components/share-modal'
import { ModeToggle } from '@/components/toggle-button'
import { Button } from '@/components/ui/button'
import { animate, inView, useAnimate, useMotionValueEvent, useScroll } from 'framer-motion'
import { Bot } from 'lucide-react'
import React, { useRef } from 'react'

const Toolbar = () => {
    const { scrollY } = useScroll()
    const [scope, animate] = useAnimate()
    useMotionValueEvent(scrollY, "change", (latest) => {
        if(scrollY.get() >= 300){
            animate(scope.current, { bottom: 20 })
        }
        else{
            animate(scope.current, { bottom: -50 })

        }
      })
    
    return (
        <div ref={scope} id='toolbar'  className='sticky  -bottom-10 flex justify-center items-center '>
            <div className='bg-[#24292e] shadow-xl px-4 py-1 rounded-full flex gap-2 '>
                <ShareModal absoluteLink={"sfsf"} title={"adasd"} />
                <div data-orientation="vertical" aria-orientation="vertical" role="separator" className="my-auto w-px bg-slate-200 dark:bg-slate-700 mx-2 h-5"></div>
                <ModeToggle/>
                <div data-orientation="vertical" aria-orientation="vertical" role="separator" className="my-auto w-px bg-slate-200 dark:bg-slate-700 mx-2 h-5"></div>
                <Button variant="link" className='rounded-full '>
                    <Bot className='text-white' />
                </Button>
            </div>
        </div>
    )
}

export default Toolbar