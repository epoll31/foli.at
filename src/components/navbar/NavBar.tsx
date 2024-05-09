import Link from "next/link";
import Home from "../icons/home";
import LinkIcon from "../icons/link";
import Portfolio from "../icons/portfolio";
import User from "../icons/user";
import GlowContainer from "./GlowContainer";
import NavTab from "./NavTab";

function Separator() {
  return <span className="w-px bg-neutral-300 self-stretch" />;
}

const tabs = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: <Portfolio />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User />,
  },
];

export default function Nav() {
  return (
    <GlowContainer
      className="fixed bottom-8 shadow-xl scale-95 hover:scale-100 transition-transform"
      glowColor="#fb3b53"
    >
      <nav className="rounded-full flex flex-row flex-nowrap h-fit gap-px ">
        {tabs.map((tab) => (
          <NavTab tab={tab} />
        ))}
      </nav>
    </GlowContainer>
  );
}
