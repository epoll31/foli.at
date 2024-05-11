import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/Accordion";

export default function Home() {
  return (
    <>
      <h2 className="text-4xl">Build Your Portfolio Now!</h2>
      <Accordion className="w-full">
        <AccordionTrigger className=" ">Work</AccordionTrigger>
        <AccordionContent className="bg-blue-300">
          <p>Work content goes here</p>
          <p>Work content goes here</p>
          <p>Work content goes here</p>
          <p>Work content goes here</p>
        </AccordionContent>
      </Accordion>
    </>
  );
}
