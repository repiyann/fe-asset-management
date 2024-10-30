import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

export const sidebar = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Masters",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Locations",
          url: "/dashboard/locations",
        },
        {
          title: "Categories",
          url: "/dashboard/categories",
        },
        {
          title: "Fixed Assets",
          url: "/dashboard/fixed-assets",
        },
        {
          title: "Depreciations",
          url: "/dashboard/depreciations",
        },
        {
          title: "Accumulation Depreciations",
          url: "/dashboard/accumulation-depreciations",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};
