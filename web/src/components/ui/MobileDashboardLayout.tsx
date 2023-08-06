"use client";
import React, { FC } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Button, { buttonVariant } from "./Button";
import { Menu } from "lucide-react";
import { SideBarLinks } from "../SideBarLinks";
import { LogoutButton } from "./LogoutButton";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";

interface MobileDashboardLayoutProps {
  user: User | null;
  accessToken: string;
  refreshToken: string;
}

export const MobileDashboardLayout: FC<MobileDashboardLayoutProps> = ({
  user,
  accessToken,
  refreshToken,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="top-0 fixed border-black border-b inset-x-0 py-2 px-4">
      <div className="w-full flex justify-between items-center">
        <Link href="/dashboard" className={buttonVariant({ variant: "ghost" })}>
          <p className="text-3xl font-bold text-black text-center container">
            Dashboard
          </p>
        </Link>
        <Button onClick={() => setOpen(true)} className="gap-4">
          Menu <Menu className="h-6 w-6" />
        </Button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-2xl font-bold leading-6 text-gray-900">
                          Dashboard
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <nav className="flex flex-1 flex-col">
                          <ul
                            role="list"
                            className="ml-4 flex flex-1 flex-col gap-y-5"
                          >
                            <SideBarLinks />
                            <LogoutButton
                              user={user!}
                              refreshToken={refreshToken}
                              accessToken={accessToken}
                              callback={() => router.replace("/login")}
                            />
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
