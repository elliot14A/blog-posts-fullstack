import React, { FC } from "react";
import { Icon, Icons } from "./ui/Icons";
import Link from "next/link";

interface SideBarLinksProps {
  icon: Icon;
  href: string;
  text: string;
}

export const SideBarLinks: FC<SideBarLinksProps> = ({ icon, href, text }) => {
  const Icon = Icons[icon];
  return (
    <div className="flex space-x-3">
      <Icon className="h-6 w-6" />
      <Link className="font-semibold" href={href}>
        {text}
      </Link>
    </div>
  );
};
