import Tabs from "@/components/Tabs";
import { headers } from "next/headers";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
