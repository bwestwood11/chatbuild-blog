"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {FacebookShareButton, LinkedinShareButton, MailruShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton} from "react-share"
import { Icons } from './Icons'
import { AtSign, Facebook, Linkedin, TwitterIcon } from 'lucide-react'
import { FaWhatsapp } from "react-icons/fa6";


const ShareComponents = [
   {
        name: "whatsapp",
        icon: FaWhatsapp,
        shareButton: WhatsappShareButton
    },
    {
        name: "facebook",
        icon:   Facebook,
        shareButton: FacebookShareButton
    },
   {
        name: "twitter",
        icon: TwitterIcon,
        shareButton: TwitterShareButton
    },
    {
        name: "linkedin",
        icon: Linkedin,
        shareButton: LinkedinShareButton
    },
    {
        name: "mail",
        icon: AtSign,   
        shareButton: MailruShareButton
    },

 ] as const


type Props = {
    absoluteLink: string
}

const ShareModal = (props: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Share with</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share With</DialogTitle>
                </DialogHeader>
                <div className='space-y-3' >
                <div className="flex w-full justify-between ">
                    {ShareComponents.map((component) => (
                        <ShareButton key={component.name} Component={component} absoluteLink={props.absoluteLink} />
                    ))}
                </div>
                <p className='text-center'>or share the link</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

type ShareProps  = {
    absoluteLink: string
    Component:typeof ShareComponents[number]
}
const ShareButton = ({Component,absoluteLink}: ShareProps) => {
    return (
        <Component.shareButton url={absoluteLink} className="mr-2  rounded-full   " style={{border:"1px solid #ffffff78", padding:"9px"}}>
            <Component.icon className='size-7 !hover:bg-white'/>
        </Component.shareButton>
    )
}






export default ShareModal