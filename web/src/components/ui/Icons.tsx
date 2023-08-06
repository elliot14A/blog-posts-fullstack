import { PenBox, User, SearchIcon } from "lucide-react";

export const Icons = {
  Explore: SearchIcon,
  User,
  Create: PenBox,
};

export type Icon = keyof typeof Icons;
