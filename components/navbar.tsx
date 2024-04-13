import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { HelpCircle } from 'lucide-react'
import { FaDiscord } from "react-icons/fa";
import { ModeToggle } from './toggle-button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="sticky   top-0 inset-x-0 h-14 z-50">
      <nav className=" bg-background/40 py-3 border-b border-foreground/20 backdrop-blur-xl w-full">
        <div
          className="container mx-auto lg:max-w-5xl flex items-center justify-between"
        >

          <div>
            <Link href="/" className="font-semibold small text-green-500 text-md">
              Chatbuild Ai
            </Link>
          </div>

          <div className='flex gap-4'>
            <Link href={"https://www.chatbuild.io/"} className={buttonVariants({variant:"secondary"})}>Visit Dashboard</Link>
            <Button variant={"ghost"}><FaDiscord size={20} /></Button>
            <ModeToggle />
            <Button variant={"ghost"}><HelpCircle size={20} /></Button>
          </div>

        </div>

      </nav>
    </header>

  )
}

export default Navbar
