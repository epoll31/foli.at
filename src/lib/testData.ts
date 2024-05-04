export interface Link {
  href: string;
  type: "github" | "linkedin" | "twitter" | "portfolio" | "other";
}

export interface User {
  username: string;
  fullName: string;
  email?: string;
  phone?: string;
  links: Link[];
  bio: string;
  title: string;
}

export const testData: User[] = [
  {
    username: "ethan",
    fullName: "Ethan Pollack",
    email: "epollack31@gmail.com",
    phone: "(818)-398-8996",
    links: [
      {
        href: "https://github.com/epoll31",
        type: "github",
      },
      {
        href: "https://www.linkedin.com/in/ethanpollack/",
        type: "linkedin",
      },
      {
        href: "https://twitter.com/epoll31",
        type: "twitter",
      },
      {
        href: "https://epoll31.github.io",
        type: "portfolio",
      },
      {
        href: "https://google.com",
        type: "other",
      },
    ],
    bio: "I am a software engineer with a passion for learning and teaching. I love to build things and help others do the same.",
    title: "Software Engineer",
  },
];
