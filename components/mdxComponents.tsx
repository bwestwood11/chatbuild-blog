"use client"
import Image from "next/image";
import React, { HTMLAttributes } from "react";

import { useMDXComponent } from "next-contentlayer/hooks";
import { Button } from "./ui/button";
import { Blog } from "contentlayer/generated";
import '@/styles/prism.css';
import Link, { LinkProps } from "next/link";

export const mdxComponents  = {
  a: ({ ...props }: any) => <Link  {...props} />,
  Image,
  Button,
};

const RenderMdx = ({ blog }: { blog: Blog }) => {
  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <div className=" prose sm:prose-base text-balance md:prose-lg max-w-full
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
     font-league">
      <MDXContent components={mdxComponents} />
    </div>
  );
};

export default RenderMdx;
