import React from 'react'
import { Button } from './ui/button'
import { HelpCircle } from 'lucide-react'
import { ModeToggle } from './toggle-button'

const Navbar = () => {
  return (
    <header className="sticky top-0 inset-x-0 h-14 z-50">
  <nav className="p-6 backdrop-blur-sm w-full">
    <div
      className="container mx-auto lg:max-w-5xl flex items-center justify-between"
    >
     
      <div>
        <a href="/" className="font-semibold small text-green-500 text-md">
          Chatbuild Ai
        </a>
      </div>

      <div className='flex gap-4'>
        <ModeToggle />
        <Button variant="outline" >
          <HelpCircle size={14} />
          Get Help
        </Button>
        <Button  >
          Visit Chatbot
        </Button>
      </div>
    
    </div>
    
  </nav>
</header>

  )
}

export default Navbar