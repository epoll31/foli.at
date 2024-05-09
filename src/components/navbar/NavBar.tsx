import LinkIcon from "../icons/link";
import Portfolio from "../icons/portfolio";
import GlowContainer from "./GlowContainer";
import NavTab from "./NavTab";

function Separator() {
  return <span className="w-px bg-neutral-300 self-stretch" />;
}

const tabs = [
  {
    name: "Home",
    href: "/",
    icon: <LinkIcon />,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: <Portfolio />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <LinkIcon />,
  },
];

export default function Nav() {
  return (
    <GlowContainer className="fixed bottom-8 shadow-xl scale-95 hover:scale-100 transition-transform">
      <nav className="rounded-full flex flex-row flex-nowrap h-fit gap-px ">
        {tabs.map((tab, index) => (
          <>
            <NavTab tab={tab} />

            {/* {index !== tabs.length - 1 && <Separator />} */}
          </>
        ))}
      </nav>
    </GlowContainer>
  );
}
