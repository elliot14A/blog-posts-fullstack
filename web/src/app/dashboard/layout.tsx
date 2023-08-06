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

const Layout: FC<LayoutProps> = ({ children }) => {
  const refreshToken = Cookies.get("refreshToken");
  const accessToken = Cookies.get("accessToken");
  const router = useRouter();
  const { setUser, user } = useUserStore();
  const logout = async () => {
    router.replace("/login");
  };
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
    <div className="w-full flex h-screen overflow-clip">
      <div className="md:hidden">
        <MobileDashboardLayout
          user={user}
          refreshToken={refreshToken || ""}
          accessToken={accessToken || ""}
        />
      </div>
      <div className="hidden top-0 md:flex h-full w-full max-w-[16rem] grow flex-col gap-y-5 border-r border-black bg-white">
        <Link
          className="ml-3 mt-3 flex shrink-0 h-16 text-center font-bold text-3xl"
          href={"/dashboard"}
        >
          Dashboard
        </Link>
        <nav className="flex flex-1 flex-col">
          <SideBarLinks />
        </nav>
        <LogoutButton
          user={user!}
          accessToken={accessToken || ""}
          refreshToken={refreshToken || ""}
          callback={() => logout()}
        />
      </div>
      <div className="container mt-16 md:mt-4">{children}</div>
    </div>
  );
};

export default Layout;
