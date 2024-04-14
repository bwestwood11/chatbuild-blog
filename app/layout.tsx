import type { Metadata } from "next";
import { Inter, League_Spartan } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar";
import { SEOMETADATA } from "@/lib/siteConfig";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const league = League_Spartan({ subsets: ["latin"], variable: "--font-league" });

export const metadata: Metadata = {
  title: "Blogs for ChatBuild AI | ChatBuilder.io",
  description: "Explore insightful blogs on building and customizing chatbot widgets for your website with ChatBuild.io.",
  metadataBase:new URL("https://blog.chatbuild.io/"),
  ...SEOMETADATA
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" scroll-smooth scroll-m-10">
      <body className={league.variable}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
     
        <div className="fixed inset-0 -z-10 select-none pointer-events-none"><Image aria-hidden src="/bg.svg" alt="Gradient Image" fill className="w-full h-full  object-left object-cover opacity-0 dark:opacity-45" /></div>
      </body>
    </html>
  );
}
