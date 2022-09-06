import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import { getMe } from "../../shared/api";
import { IUser } from "../../shared/types";

interface IGlobalContext {
  user: IUser | null;
  isLoading: boolean;
}

export const GlobalContext = createContext<IGlobalContext>(
  {} as IGlobalContext
);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const { isLoading, isError, data } = useQuery(["me"], getMe, {
    refetchOnWindowFocus: false,
  });

  const value = {
    user: data ?? null,
    isLoading,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
