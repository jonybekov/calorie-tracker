import { LoginPage } from "../../auth/login-page";
import { RegisterPage } from "../../auth/register-page";
import { DashboardPage } from "../../dashboard/dashboard-page";
import { DashboardLayout } from "../../shared/layouts/dashboard.layout";
import { UsersPage } from "../../dashboard/users-page";
import { UserPage } from "../../dashboard/user-page";
import { ProtectedRoute } from "../../app/routes/protected-route";
import { AccessDenied, NotFound } from "../../shared/components";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";
import { HomePage } from "../../home/home-page";

export function Routes() {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="dashboard/users" element={<UsersPage />} />
            <Route path="dashboard/users/:id" element={<UserPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </BrowserRoutes>
    </BrowserRouter>
  );
}
