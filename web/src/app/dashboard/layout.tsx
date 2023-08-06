"use client";

import { SideBarLinks } from "@/components/SideBarLinks";
import Button from "@/components/ui/Button";
import { Icons, Icon } from "@/components/ui/Icons";
import { getUser } from "@/lib/getUser";
import { useUserStore } from "@/lib/zustand/user";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const sidebarLinks: {
  icon: "Explore" | "User" | "Create";
  href: string;
  text: string;
}[] = [
    {
      icon: "Explore",
      href: "/dashboard",
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

const Layout: FC<LayoutProps> = ({ children }) => {
  const refreshToken = Cookies.get("refreshToken");
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const { setUser, user } = useUserStore();
  useEffect(() => {
    getUser({
      refreshToken: refreshToken || "",
      accessToken: accessToken || "",
    }).then((user) => {
      setUser(user);
      if (!user) {
        router.replace("/login");
      }
    });
  }, []);
  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-[16rem] grow flex-col gap-y-5 overflow-y-auto border-r border-black bg-white">
        <Link
          className="ml-3 mt-3 flex shrink-0 h-16 text-center font-bold text-3xl"
          href={"/dashboard"}
        >
          Dashboard
        </Link>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="ml-4 flex flex-1 flex-col gap-y-5">
            {sidebarLinks.map(({ icon, href, text }) => {
              return <SideBarLinks icon={icon} href={href} text={text} />;
            })}
          </ul>
        </nav>
        <div className="m-2">
          <Button className="w-full overflow-ellipsis truncate">
            <div className="overflow-ellipsis truncate">{`Logout ${user?.name}`}</div>
          </Button>
        </div>
      </div>
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
