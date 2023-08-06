import React, { FC } from "react";
import { Icons } from "./ui/Icons";
import Link from "next/link";

const sidebarLinks: {
  icon: "Explore" | "User" | "Create";
  href: string;
  text: string;
}[] = [
    {
      icon: "Explore",
      href: "/dashboard/explore",
      text: "Explore",
    },
    {
      icon: "User",
      href: "/dashboard/myblogs",
      text: "My Blogs",
    },
    {
      icon: "Create",
      href: "/dashboard/myblogs/create",
      text: "Write a blog",
    },
  ];
export const SideBarLinks: FC = () => {
  return (
    <ul role="list" className="ml-4 flex flex-1 flex-col gap-y-5">
      {sidebarLinks.map(({ icon, href, text }) => {
        const Icon = Icons[icon];
        return (
          <div key={icon} className="flex space-x-3">
            <Icon className="h-6 w-6" />
            <Link className="font-semibold" href={href}>
              {text}
            </Link>
          </div>
        );
      })}
    </ul>
  );
};
