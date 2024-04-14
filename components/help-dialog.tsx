import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} aria-label="Need Any Help">
          <span className="sr-only text-foreground">Want Any Help</span>
          <HelpCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[70%] h-[80%] max-w-[70%]">
        
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/GJgQ-Ox7a2k?si=_txp_vWCV6EYoYov"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
