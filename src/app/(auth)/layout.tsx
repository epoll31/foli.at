import Tabs from "@/components/Tabs";
import { headers } from "next/headers";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-[100dvw] h-[100dvh] flex flex-col items-center justify-center">
      <div className="min-w-prose min-h-60 flex flex-col items-center">
        <Tabs
          tabs={[
            {
              label: "Log In",
              href: "/login",
            },
            {
              label: "Sign Up",
              href: "/signup",
            },
          ]}
        />
        {children}
      </div>
    </div>
  );
}
