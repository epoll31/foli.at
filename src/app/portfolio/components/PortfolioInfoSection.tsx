import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { Portfolio } from "@/lib/types";

export default function PortfolioInfoSection({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="tag">Tag:</label>
        <Input
          className="w-full"
          id="tag"
          name="tag"
          defaultValue={portfolio.tag}
          required
        />
        <label htmlFor="full_name">Full Name:</label>
        <Input
          className="w-full"
          id="full_name"
          name="full_name"
          defaultValue={portfolio.full_name}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="title">Title:</label>
        <Input
          className="w-full"
          id="title"
          name="title"
          defaultValue={portfolio.title}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bio">Bio:</label>
        <TextArea
          className="h-32"
          id="bio"
          name="bio"
          defaultValue={portfolio.bio}
          required
        />
      </div>
    </>
  );
}
