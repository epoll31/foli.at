"use client";

import { updatePortfolioFromFormData } from "@/app/profile/actions";
import Trash from "@/components/icons/trash";
import { PortfolioGroup } from "@/lib/types";
import { motion } from "framer-motion";
import { HTMLProps, useState } from "react";

function useKeyedItems<T>(startingItems: T[] = [], defaultValue: T) {
  const [items, setItems] = useState(
    startingItems.map((value, index) => ({
      key: index,
      value: value,
    }))
  );
  function addItem() {
    setItems([
      ...items,
      {
        key: items.reduce(
          (acc, item) => (acc > item.key ? acc : item.key) + 1,
          0
        ),
        value: defaultValue,
      },
    ]);
  }
  function removeItem(key: number) {
    setItems(items.filter((item) => item.key !== key));
  }
  return { items: items, addItem, removeItem };
}

export default function UpdatePorfolioForm({
  portfolioGroup,
}: {
  portfolioGroup: PortfolioGroup;
}) {
  const {
    items: links,
    addItem: addLink,
    removeItem: removeLink,
  } = useKeyedItems<{ type: string; href: string }>(portfolioGroup.links, {
    type: "other",
    href: "",
  });
  // const {
  //   items: workKeys,
  //   addItem: addWork,
  //   removeItem: removeWork,
  // } = useKeyedItems <
  // Omit<WorkEntry, "start_date" | "end_date">(portfolioGroup.workEntries, {
  //   title: "",
  //   company: "",
  //   description: "",
  //   start_date: "",
  //   end_date: "",
  // });

  function handleSubmit(formData: FormData) {
    updatePortfolioFromFormData(portfolioGroup, formData);
  }

  return (
    <form className="flex flex-col w-fit gap-4">
      <div className="flex flex-col">
        <label htmlFor="display_name">Name:</label>
        <input
          id="display_name"
          name="display_name"
          defaultValue={portfolioGroup.portfolio.display_name}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          defaultValue={portfolioGroup.portfolio.title}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={portfolioGroup.portfolio.bio}
          required
        />
      </div>
      <div className="flex flex-col  gap-4">
        <p>Links:</p>
        {links.map((link, index) => (
          <div key={link.key} className="flex flex-col relative ">
            <p className="text-center">Link {index + 1}</p>
            <label htmlFor={`link-type-${link.key}`}>Type:</label>
            <select
              id={`link-type-${link.key}`}
              name={`link-type-${link.key}`}
              required
              defaultValue={link.value.type}
            >
              <option value="github">Github</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="portfolio">Portfolio</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor={`link-href-${link.key}`}>Link:</label>
            <input
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
      {/* <div className="flex flex-col gap-4">
        <p>Work:</p>
        {workKeys.map((key, index) => (
          <div key={key} className="flex flex-col relative">
            <p className="text-center">Work {index + 1}</p>
            <label htmlFor={`work-title-${key}`}>Title:</label>
            <input
              id={`work-title-${key}`}
              name={`work-title-${key}`}
              required
            />
            <label htmlFor={`work-company-${key}`}>Company:</label>
            <input
              id={`work-company-${key}`}
              name={`work-company-${key}`}
              required
            />
            <label htmlFor={`work-description-${key}`}>Description:</label>
            <textarea
              id={`work-description-${key}`}
              name={`work-description-${key}`}
              required
            />
            <label htmlFor={`work-start_date-${key}`}>Start Date:</label>
            <input
              id={`work-start_date-${key}`}
              name={`work-start_date-${key}`}
              type="month"
              required
            />
            <label htmlFor={`work-end_date-${key}`}>End Date:</label>
            <input
              id={`work-end_date-${key}`}
              name={`work-end_date-${key}`}
              type="month"
              required
            />
            <TrashButton onClick={() => removeWork(key)} />
          </div>
        ))}
        <button type="button" onClick={addWork} className="w-full text-center">
          Add Work
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <p>Education:</p>
        {educationKeys.map((key, index) => (
          <div key={key} className="flex flex-col relative">
            <p className="text-center">Education {index + 1}</p>
            <label htmlFor={`education-school-${key}`}>School:</label>
            <input
              id={`education-school-${key}`}
              name={`education-school-${key}`}
              required
            />
            <label htmlFor={`education-degree-${key}`}>Degree:</label>
            <input
              id={`education-degree-${key}`}
              name={`education-degree-${key}`}
              required
            />
            <label htmlFor={`education-description-${key}`}>Description:</label>
            <textarea
              id={`education-description-${key}`}
              name={`education-description-${key}`}
              required
            />
            <label htmlFor={`education-start_date-${key}`}>Start Date:</label>
            <input
              id={`education-start_date-${key}`}
              name={`education-start_date-${key}`}
              type="month"
              required
            />
            <label htmlFor={`education-end_date-${key}`}>End Date:</label>
            <input
              id={`education-end_date-${key}`}
              name={`education-end_date-${key}`}
              type="month"
              required
            />
            <TrashButton onClick={() => removeEducation(key)} />
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className="w-full text-center"
        >
          Add Education
        </button>
      </div> */}

      <button formAction={handleSubmit}>Save</button>
    </form>
  );
}

function TrashButton(props: {
  onClick: HTMLProps<HTMLButtonElement>["onClick"];
}) {
  return (
    <motion.button
      type="button"
      className="text-red-400 absolute top-0 right-0"
      initial={{
        scale: 1,
        color: "#737373",
        rotate: "0deg",
      }}
      whileHover={{
        scale: 1.15,
        color: "#f87171",
        rotate: ["0deg", "3deg", "0deg", "-3deg", "0deg"],
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 300,
        rotate: {
          repeat: Infinity,
          duration: 0.5,
          type: "keyframes",
        },
        color: {
          type: "tween",
        },
      }}
      {...props}
    >
      <Trash width={20} height={20} />
    </motion.button>
  );
}
