import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import { cn } from "@/utils/cn";
import TagProvider from "@/components/TagContext";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "foli.at",
  description: "a new way to share your work",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className=" transition-light-dark">
      <body
        className={cn(
          inter.className,
          "min-w-[100dvw] min-h-[100dvh] flex flex-col items-center justify-center overflow-x-hidden"
        )}
      >
        <TagProvider startEmail={session?.user?.email ?? undefined}>
          <div className="min-h-full flex flex-col justify-center items-center mx-8 py-12 sm:py-24 md:py-32">
            {children}
          </div>
          <NavBar />
        </TagProvider>
      </body>
    </html>
  );
}
