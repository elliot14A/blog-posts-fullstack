import { PenBox, User, SearchIcon } from "lucide-react";
import React from "react";

export const Icons = {
  Explore: SearchIcon,
  User,
  Create: PenBox,
};

export type Icon = keyof typeof Icons;
