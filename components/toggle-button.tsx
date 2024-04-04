"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";


export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if(theme === "dark"){
      setTheme("light")
    }
    else{
      setTheme("dark")

    }
  }

  return (
    <Button variant='ghost' onClick={toggleTheme}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
