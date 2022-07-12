import { createContext } from "react";

export const ShowContext = createContext({});
export const LoadingContext = createContext({});
export const RegContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
