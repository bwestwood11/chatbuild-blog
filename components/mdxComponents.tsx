import * as React from "react"
import Image from "next/image"
import * as runtime from 'react/jsx-runtime'
import "@/styles/prism.css"



const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image
}

interface MdxProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export function MDXContent({ code, components }: MdxProps) {
  const Component = useMDXComponent(code)
  return <Component components={{ Image, ...components }} />
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx prose text-foreground   sm:prose-base text-balance md:prose-lg max-w-full
    prose-blockquote:bg-accent/20 
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:border-accent
    prose-blockquote:not-italic
    prose-blockquote:rounded-r-lg

    prose-li:marker:text-accent

    dark:prose-invert
    dark:prose-blockquote:border-accentDark
    dark:prose-blockquote:bg-accentDark/20
    dark:prose-li:marker:text-accentDark
     font-league ">
      <Component components={components} />
    </div>
  )
}
