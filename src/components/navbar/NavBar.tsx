import Home from "../icons/home";
import Briefcase from "../icons/briefcase";
import User from "../icons/user";
import GlowContainer from "../GlowContainer";
import NavTab, { Tab } from "./NavTab";
import Logout from "../icons/logout";
import Pencil from "../icons/pencil";
import { auth } from "@/auth";
import getPortfolio from "@/utils/actions/getPortfolio";
import Gear from "../icons/gear";

function getLoggedInTabs(tag?: string): Tab[] {
  if (!tag) {
    return [
      {
        name: "Home",
        href: "/",
        icon: <Home />,
      },
      {
        name: "Edit Portfolio",
        href: "/portfolio",
        icon: <Pencil />,
      },
      // {
      //   name: "Settings",
      //   href: "/settings",
      //   icon: <Gear />,
      // },
      {
        name: "Sign Out",
        action: "logout",
        icon: <Logout />,
      },
    ];
  }
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
    // {
    //   name: "Settings",
    //   href: "/settings",
    //   icon: <Gear />,
    // },
    {
      name: "Sign Out",
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
    const email = session.user?.email;
    if (!email) {
      return null;
    }

    const portfolio = await getPortfolio({
      email,
    });

    tabs = getLoggedInTabs(portfolio?.tag);
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
