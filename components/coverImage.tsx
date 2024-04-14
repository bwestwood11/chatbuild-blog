import Image, {ImageProps} from 'next/image'
import React from 'react'
import { Skeleton } from './ui/skeleton'

type ImagePropswithoutSrc = {
  hostedsrc?: string,
  absolutesrc?: string,
} & Omit<ImageProps, 'src'>

const CoverImage = ({hostedsrc,absolutesrc, alt, ...props}:ImagePropswithoutSrc) => {
  return (
    <>
    {hostedsrc && <Image  alt="Cover Image" {...props} src={hostedsrc} />}
    {absolutesrc && <Image alt="Cover Image" {...props} src={absolutesrc} />}
    {!hostedsrc && !absolutesrc && <Skeleton/>}
    </>
  )
}

export default CoverImage