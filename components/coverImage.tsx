import Image, {ImageProps} from 'next/image'
import React from 'react'
import { Skeleton } from './ui/skeleton'

type ImagePropswithoutSrc = {
  hostedsrc?: string,
  absolutesrc?: string,
} & Omit<ImageProps, 'src'>

const CoverImage = ({hostedsrc,absolutesrc, ...props}:ImagePropswithoutSrc) => {
  return (
    <>
    {hostedsrc && <Image {...props} src={hostedsrc} />}
    {absolutesrc && <Image {...props} src={absolutesrc} />}
    {!hostedsrc && !absolutesrc && <Skeleton/>}
    </>
  )
}

export default CoverImage