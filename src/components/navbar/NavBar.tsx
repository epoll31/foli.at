import Home from "../icons/home";
import Briefcase from "../icons/briefcase";
import User from "../icons/user";
import GlowContainer from "../GlowContainer";
import NavTab, { Tab } from "./NavTab";
import Logout from "../icons/logout";
import Pencil from "../icons/pencil";
import { getTagFromUserId } from "@/utils/supabase/actions/getTagFromUserId";
import { auth } from "@/auth";

function getLoggedInTabs(tag: string): Tab[] {
  return [
    {
      name: "Home",
      href: "/",
      icon: <Home />,
    },
    {
      name: "View Portfolio",
      href: `/${tag}`,
      icon: <Briefcase />,
    },
    {
      name: "Edit Portfolio",
      href: "/portfolio",
      icon: <Pencil />,
    },
    {
      name: "Log Out",
      action: "logout",
      icon: <Logout />,
    },
  ];
}

const loggedOutTabs: Tab[] = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    name: "Sign In",
    href: "/signin",
    icon: <User />,
  },
];

export default async function Nav() {
  const session = await auth();

  let tabs = loggedOutTabs;

  if (session) {
    tabs = getLoggedInTabs("ethan");
  }

  return (
    <GlowContainer
      className="fixed bottom-8 shadow-xl z-40"
      glowColor="#fb3b53"
    >
      <nav className="rounded-full flex flex-row flex-nowrap h-fit gap-px z-50">
        {tabs.map((tab) => (
          <NavTab tab={tab} key={tab.name} />
        ))}
      </nav>
    </GlowContainer>
  );
}
