"use client";

import { createPortfolio } from "@/app/edit/actions";
import Trash from "@/components/icons/trash";
import { MotionProps, motion } from "framer-motion";
import { HTMLProps, useState } from "react";
// import {
//   CreatePortfolioData,
//   CreateEducationEntryData,
//   CreateLinkData,
//   CreateWorkEntryData,
// } from "@/utils/supabase/actions/createPortfolio";

function useKeys() {
  const [keys, setKeys] = useState<number[]>([]);
  function addKey() {
    setKeys([
      ...keys,
      keys.reduce((acc, key) => (acc > key ? acc : key) + 1, 0),
    ]);
  }
  function removeKey(key: number) {
    setKeys(keys.filter((k) => k !== key));
  }

  return { keys, addKey, removeKey };
}

export default function EditPorfolioForm() {
  const { keys: linkKeys, addKey: addLink, removeKey: removeLink } = useKeys();
  const {
    keys: educationKeys,
    addKey: addEducation,
    removeKey: removeEducation,
  } = useKeys();
  const { keys: workKeys, addKey: addWork, removeKey: removeWork } = useKeys();

  return (
    <form className="flex flex-col w-fit gap-4">
      <div className="flex flex-col">
        <label htmlFor="display_name">Name:</label>
        <input id="display_name" name="display_name" required />
      </div>
      <div className="flex flex-col">
        <label htmlFor="title">Title:</label>
        <input id="title" name="title" required />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" required />
      </div>
      <div className="flex flex-col  gap-4">
        <p>Links:</p>
        {linkKeys.map((key, index) => (
          <div key={key} className="flex flex-col relative ">
            <p className="text-center">Link {index + 1}</p>
            <label htmlFor={`link-type-${key}`}>Type:</label>
            <input
              id={`link-ntypeame-${key}`}
              name={`link-type-${key}`}
              required
            />
            <label htmlFor={`link-link-${key}`}>Link:</label>
            <input
              id={`link-${key}`}
              name={`link-${key}`}
              type="url"
              required
            />
            <TrashButton onClick={() => removeLink(key)} />
          </div>
        ))}
        <button type="button" onClick={addLink} className="w-full text-center">
          Add Link
        </button>
      </div>
      <div className="flex flex-col gap-4">
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
      </div>

      <button formAction={createPortfolio}>Save</button>
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
