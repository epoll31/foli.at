"user client";

import DropDown from "@/components/ui/DropDown";
import useKeyedItems from "../utils/useKeyedItems";
import { Link } from "@/lib/types";
import Input from "@/components/ui/Input";
import TrashButton from "./TrashButtons";

export default function LinksSection({ links: startLinks }: { links: Link[] }) {
  const {
    items: links,
    addItem: addLink,
    removeItem: removeLink,
  } = useKeyedItems<{ type: string; href: string }>(startLinks, {
    type: "other",
    href: "",
  });

  return (
    <>
      <div className="flex flex-col  gap-4">
        <p>Links:</p>
        {links.map((link, index) => (
          <div key={link.key} className="flex flex-col relative ">
            <p className="text-center">Link {index + 1}</p>
            <label htmlFor={`link-type-${link.key}`}>Type:</label>
            <DropDown
              options={[
                { value: "github", label: "Github" },
                { value: "linkedin", label: "LinkedIn" },
                { value: "twitter", label: "Twitter" },
                { value: "portfolio", label: "Portfolio" },
                { value: "other", label: "Other" },
              ]}
              name={`link-type-${link.key}`}
              id={`link-type-${link.key}`}
              required
              defaultValue={link.value.type}
            />
            <label htmlFor={`link-href-${link.key}`}>Link:</label>
            <Input
              className="w-full"
              id={`link-href-${link.key}`}
              name={`link-href-${link.key}`}
              defaultValue={link.value.href}
              type="url"
              required
            />
            <TrashButton onClick={() => removeLink(link.key)} />
          </div>
        ))}
        <button type="button" onClick={addLink} className="w-full text-center">
          Add Link
        </button>
      </div>
    </>
  );
}
