import { testData } from "@/lib/testData";

export async function generateStaticParams() {
  const validUsers = testData.map((user) => user.username);

  return validUsers.map((username) => ({ username: username }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
