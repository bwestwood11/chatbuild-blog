"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {FacebookIcon, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton , TwitterIcon, LinkedinIcon, MailruIcon, EmailShareButton, EmailIcon} from "react-share"
import { Input } from './ui/input'
import { Share2Icon } from 'lucide-react'
import { AbsoluteUrl } from '@/lib/utils'

const ShareComponents = [
    {
         name: "whatsapp",
         icon: WhatsappIcon,
         shareButton: WhatsappShareButton,
         props: (url: string, title?:string) => ({
            url,
            title,
            separator:"::"
         })
     },
     {
         name: "facebook",
         icon:   FacebookIcon,
         shareButton: FacebookShareButton,
         props: (url: string, title?:string) => ({
            url,
         })
     },
    {
         name: "twitter",
         icon: TwitterIcon,
         shareButton: TwitterShareButton,
         props: (url: string, title?:string) => ({
            url,
            title
         })
     },
     {
         name: "linkedin",
         icon: LinkedinIcon,
         shareButton: LinkedinShareButton,
         props: (url: string, title?:string) => ({
            url
         })
     },
     {
         name: "mail",
         icon: EmailIcon,   
         shareButton: EmailShareButton,
         props: (url: string, title?:string) => ({
            url,
            subject:title,
            body:"Look What i shared with you"
         })
     },
 
  ] as const
 

type Props = {
    absoluteLink: string,
    title:string;
}

const ShareModal = (props: Props) => {
    const Link = AbsoluteUrl(props.absoluteLink)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className='rounded-full ' aria-label='Share the blog'> 
                    <span className='sr-only'>Share The Blog</span>
                    <Share2Icon className="hover:text-accent/50"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share With</DialogTitle>
                </DialogHeader>
                <div className='space-y-3' >
                <div className="flex w-full justify-between ">
                    {ShareComponents.map((component) => (
                        <ShareButton key={component.name} title={props.title} Component={component} Link={Link} />
                    ))}
                </div>
                <p className='text-center'>or share the link</p>
                <div className="flex w-full justify-between gap-3 ">
                    <Input value={Link}/>
                   
                    <Button onClick={() => navigator.clipboard.writeText(Link)} variant="default">Copy</Button>
                </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

type ShareProps  = {
    Link: string;
    Component:typeof ShareComponents[number];
    title:string;
}

const ShareButton = ({Component,Link,title}: ShareProps) => {
    return (
        <Component.shareButton  url={Link} >
            <Component.icon {...Component.props(Link,title)}  round={true} size={42}  />
        </Component.shareButton>
    )
}




export default ShareModal