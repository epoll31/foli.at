export interface Link {
  href: string;
  type: "github" | "linkedin" | "twitter" | "portfolio" | "other";
}
export interface WorkExperience {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}

export interface User {
  username: string;
  fullName: string;
  email?: string;
  phone?: string;
  links: Link[];
  bio: string;
  title: string;
  workHistory: WorkExperience[];
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
    workHistory: [
      {
        title: "Software Engineer",
        company: "Google",
        startDate: new Date("2018-01-01"),
        endDate: new Date("2019-12-31"),
        description:
          "I worked on the Google Search team. I built the search bar. It was fun.",
      },
      {
        title: "Software Engineer",
        company: "Facebook",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2021-12-31"),
        description:
          "I worked on the Facebook Ads team. I built the ads. It was fun. I also built the search bar. It was fun.",
      },
      {
        title: "Software Engineer",
        company: "Amazon",
        startDate: new Date("2022-01-01"),
        endDate: undefined,
        description:
          "I worked on the Amazon Web Services team. I built the web services. It was fun. I also built the search bar. It was fun. I also built the ads. It was fun.",
      },
    ],
  },
];
