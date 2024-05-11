import BackgroundGrid from "@/components/BackgroundGrid";
import Tabs from "./components/Tabs";
import Card from "@/components/ui/Card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundGrid size={30} />
      <Card className="p-0 border border-neutral-200">
        <div className="px-4 py-4 rounded-t-xl bg-neutral-100 border-neutral-200 border-b">
          <Tabs
            className="mx-auto flex gap-6"
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
        </div>
        <div className="p-6 ">{children}</div>
      </Card>
    </>
  );
}
