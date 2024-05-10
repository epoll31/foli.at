import Tabs from "@/components/Tabs";

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
