import { createClient } from "@/utils/supabase/server";
import Home from "../icons/home";
import Portfolio from "../icons/portfolio";
import User from "../icons/user";
import GlowContainer from "./GlowContainer";
import NavTab, { Tab } from "./NavTab";
import Logout from "../icons/logout";
import Search from "../icons/search";

const loggedInTabs: Tab[] = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    name: "Search",
    href: "/search",
    icon: <Search />,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: <Portfolio />,
  },
  {
    name: "Log Out",
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
    name: "Search",
    href: "/search",
    icon: <Search />,
  },
  {
    name: "Login",
    href: "/login",
    icon: <User />,
  },
];

export default async function Nav() {
  const supabase = createClient();
  const { error } = await supabase.auth.getUser();
  const tabs = error ? loggedOutTabs : loggedInTabs;

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
