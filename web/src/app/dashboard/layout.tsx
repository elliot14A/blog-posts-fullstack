"use client";

import { SideBarLinks } from "@/components/SideBarLinks";
import { LogoutButton } from "@/components/ui/LogoutButton";
import { MobileDashboardLayout } from "@/components/ui/MobileDashboardLayout";
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
      } else if (user.newAccessToken) {
        Cookies.set("accessToken", user.newAccessToken);
      }
    });
  }, []);
  return (
    <div className="w-full flex h-screen">
      <div className="md:hidden">
        <MobileDashboardLayout
          user={user}
          refreshToken={refreshToken || ""}
          accessToken={accessToken || ""}
        />
      </div>
      <div className="hidden md:flex h-full w-full max-w-[16rem] grow flex-col gap-y-5 overflow-y-auto border-r border-black bg-white">
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
        <LogoutButton
          user={user!}
          accessToken={accessToken || ""}
          refreshToken={refreshToken || ""}
        />
      </div>
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
