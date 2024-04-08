import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const FormatTime = (date:string) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const AbsoluteUrl = (path:string) => {
  const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  return `${NEXT_PUBLIC_APP_URL}${path}`
}

export const FormatProperCasing = (str:string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}