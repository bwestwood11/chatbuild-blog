import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const wordCountFromHTML = (html: string) => {
  const text = new DOMParser().parseFromString(html, "text/html").body.textContent
  return text?.split(/\s+/).length || 0
}

export const readingTimeFromHTML = (html: string) => {
  const words = wordCountFromHTML(html)
  const wordsPerMinute = 200
  const minutes = words / wordsPerMinute
  return Math.ceil(minutes)
}


