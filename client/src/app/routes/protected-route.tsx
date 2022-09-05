import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../../shared/types";
import { useGlobalContext } from "../contexts/global.context";

interface IProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({
  redirectPath = "/access-denied",
  children,
}: React.PropsWithChildren<IProtectedRouteProps>) => {
  const { user, isLoading } = useGlobalContext();

  if (user === null && !isLoading)
    return (
      <Navigate
        to={{ pathname: "/login", search: `redirect=${location.pathname}` }}
        replace
      />
    );

  if (user && user.role === Role.Admin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <div>{children}</div> : <Outlet />;
};
