import Home from "../icons/home";
import Briefcase from "../icons/briefcase";
import User from "../icons/user";
import GlowContainer from "../GlowContainer";
import NavTab, { Tab } from "./NavTab";
import Logout from "../icons/logout";
import Pencil from "../icons/pencil";
import { auth } from "@/auth";
import ThemeInitializer from "../ThemeInitializer";
import ThemeIcon from "../ThemeIcon";

const loggedInTabs: Tab[] = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    name: "View Portfolio",
    action: "tag",
    icon: <Briefcase />,
  },
  {
    name: "Edit Portfolio",
    href: "/portfolio",
    icon: <Pencil />,
  },
  {
    name: "Theme",
    action: "theme",
    icon: <ThemeIcon />,
  },
  {
    name: "Sign Out",
    action: "logout",
    icon: <Logout />,
  },
];

const loggedOutTabs: Tab[] = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    name: "Theme",
    action: "theme",
    icon: <ThemeIcon />,
  },
  {
    name: "Sign In",
    href: "/signin",
    icon: <User />,
  },
];

export default async function Nav() {
  const session = await auth();

  let tabs = session ? loggedInTabs : loggedOutTabs;

  return (
    <>
      <GlowContainer
        className="fixed bottom-8 shadow-xl z-40 bg-theme-nav-primary  transition-light-dark"
        glowColor="var(--theme-nav-glow)"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <nav className="rounded-full flex flex-row flex-nowrap h-fit gap-px z-50">
          {tabs.map((tab) => (
            <NavTab tab={tab} key={tab.name} />
          ))}
        </nav>
      </GlowContainer>
      <ThemeInitializer />
    </>
  );
}
