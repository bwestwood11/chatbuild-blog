"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";


export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const mounted = useMounted()

  const toggleTheme = () => {
    if(theme === "dark"){
      setTheme("light")
    }
    else {
      setTheme("dark")
    }
  }
if(mounted) {
  return (
  <Button variant='ghost' onClick={toggleTheme}>
    {theme === "dark" ? <Sun /> : <Moon />}
  </Button>);
}
else{
  return (
    <Button variant='ghost'>
      <Sun />
    </Button>);
}


  
}
