"use client";
import { User } from "@/lib/types";
import React, { FC } from "react";
import Button from "./Button";
import axios from "axios";
import Cookies from "js-cookie";

interface LogoutButtonProps {
  user: User;
  accessToken: string;
  refreshToken: string;
  callback?: () => void;
}

export const LogoutButton: FC<LogoutButtonProps> = ({
  user,
  accessToken,
  refreshToken,
  callback,
}) => {
  const logout = async () => {
    try {
      await axios.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-refresh": refreshToken,
          },
        },
      );
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    } catch (err) {
      console.log(err);
    } finally {
      callback!();
    }
  };
  return (
    <div className="m-2">
      <Button
        className="w-full overflow-ellipsis truncate"
        onClick={() => logout()}
      >
        <div className="overflow-ellipsis truncate">{`Logout ${user?.name}`}</div>
      </Button>
    </div>
  );
};
