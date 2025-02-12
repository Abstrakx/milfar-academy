import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import localFont from "next/font/local";
import NavbarUser from "@/app/(dashboard)/_components/navbar-user";
import FooterUser from "@/app/(dashboard)/_components/footer-user";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
    src: "../../../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
  });

const geistMono = localFont({
    src: "../../../../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  });

const OverviewLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <div className="h-full">
        <ClerkProvider>
        <NavbarUser />
        
        <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NextSSRPlugin 
            routerConfig={extractRouterConfig(ourFileRouter)}
          /> 
          {children}
        </main>

        <FooterUser />
        </ClerkProvider>
    </div>
  )
}

export default OverviewLayout