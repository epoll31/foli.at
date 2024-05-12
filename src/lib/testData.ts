import { PortfolioGroup } from "./types";

export const testData: PortfolioGroup[] = [
  {
    portfolio: {
      id: 0,
      tag: "epoll31",
      full_name: "Ethan Pollack",
      bio: "I am a software engineer with a passion for learning and teaching. I love to build things and help others do the same.",
      title: "Software Engineer",
    },
    links: [
      {
        id: 0,
        href: "https://github.com/epoll31",
        type: "github",
      },
      {
        id: 1,
        href: "https://www.linkedin.com/in/ethanpollack/",
        type: "linkedin",
      },
      {
        id: 2,
        href: "https://twitter.com/epoll31",
        type: "twitter",
      },
      {
        id: 3,
        href: "https://epoll31.github.io",
        type: "portfolio",
      },
      {
        id: 4,
        href: "https://google.com",
        type: "other",
      },
    ],
    workEntries: [
      {
        id: 0,
        title: "Software Engineer",
        company: "Google",
        start_date: new Date("2018-01-01"),
        end_date: new Date("2019-12-31"),
        description:
          "I worked on the Google Search team. I built the search bar. It was fun.",
      },
      {
        id: 1,
        title: "Software Engineer",
        company: "Facebook",
        start_date: new Date("2020-01-01"),
        end_date: new Date("2021-12-31"),
        description:
          "I worked on the Facebook Ads team. I built the ads. It was fun. I also built the search bar. It was fun.",
      },
      {
        id: 2,
        title: "Software Engineer",
        company: "Amazon",
        start_date: new Date("2022-01-01"),
        end_date: null,
        description:
          "I worked on the Amazon Web Services team. I built the web services. It was fun. I also built the search bar. It was fun. I also built the ads. It was fun.",
      },
    ],
    educationEntries: [
      {
        id: 0,
        degree: "Bachelor of Science",
        major: "Computer Science",
        school: "Worcester Polytechnic Institute",
        start_date: new Date(2020, 8),
        end_date: new Date(2024, 5),
        description: "I studied Computer Science and Engineering.",
      },
      {
        id: 1,
        degree: "High School Diploma",
        major: null,
        school: "Calabasas High School",
        start_date: new Date(2016, 8),
        end_date: new Date(2020, 5),
        description: "I studied Computer Science and Engineering.",
      },
    ],
  },
];
