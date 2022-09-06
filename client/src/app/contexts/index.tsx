import React, { useEffect, useState, createContext, useContext } from "react";
import { getMe } from "../../shared/api";
import { IUser } from "../../shared/types";

interface IGlobalContext {
  user: IUser | null;
  isLoading: boolean;
}

export const GlobalContext = createContext<IGlobalContext>({
  user: null,
  isLoading: false,
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getMe()
      .then((data) => setUser(data))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isLoading,
    }),
    [user, isLoading]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
