import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { HelpCircle } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { ModeToggle } from "./toggle-button";
import Link from "next/link";
import LogoComponent from "./Logo";
import { HelpDialog } from "./help-dialog";

const Navbar = () => {
  return (
    <header className="sticky   top-0 inset-x-0 h-14 z-50">
      <nav className=" bg-background/40 py-3 border-b border-foreground/20 backdrop-blur-xl w-full">
        <div className="container mx-auto lg:max-w-5xl flex items-center justify-between">
          <div>
            <Link href="/" className="flex space-x-4 items-center justify-center" aria-label="Go To Home Page">
              <LogoComponent className="size-8" />
              <h2 className="text-xl leading-none  font-extrabold " >
                ChatBuild AI
              </h2>
            </Link>
          </div>

          <div className="flex gap-4">
            <Link
              href={"https://www.chatbuild.io/"}
              className={buttonVariants({ variant: "secondary" })}
              aria-label="Visit Dashboard"
            >
              Visit Dashboard
            </Link>
            <Link href={"https://discord.gg/45w2Ymzr"} target="_blank" className={buttonVariants({variant:"ghost"})} >
              <span className="sr-only text-foreground">Discord</span>
              <FaDiscord size={20} aria-label="Open Discord channel"/>
            </Link>
            <ModeToggle IconColor="" aria-label="Toggle Dark Mode" />
            <HelpDialog aria-label="Open Help Dialog"/>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
