import { createContext } from "react";
export interface IUser {
  name: string;
  email: string;
  authenticated: boolean;
  streak: number;
}

export const UserContext = createContext<IUser>({
  name: "",
  email: "",
  authenticated: false,
  streak: 0,
});
