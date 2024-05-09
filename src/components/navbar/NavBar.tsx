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
    // <GlowContainer className="fixed bottom-8 shadow-xl scale-95 hover:scale-100 transition-transform">
    //   <nav className="px-1 py-2 rounded-full flex flex-row flex-nowrap h-fit ">
    //     {tabs.map((tab, index) => (
    //       <>
    //         <div
    //           key={tab.name}
    //           className="flex flex-row justify-center items-center gap-2 transition-all group px-2"
    //         >
    //           {tab.icon}
    //           <p className="opacity-0 w-0 text-center group-hover:opacity-100 group-hover:w-20 overflow-hidden transition-all duration-300">
    //             {tab.name}
    //           </p>
    //         </div>
    //         {index !== tabs.length - 1 && <Separator />}
    //       </>
    //     ))}
    //   </nav>
    // </GlowContainer>
    <GlowContainer className="fixed bottom-8 shadow-xl scale-95 hover:scale-100 transition-transform">
      <nav className="rounded-full flex flex-row flex-nowrap h-fit ">
        {tabs.map((tab, index) => (
          <>
            <NavTab tab={tab} />

            {index !== tabs.length - 1 && <Separator />}
          </>
        ))}
      </nav>
    </GlowContainer>
  );
}
