import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import MenuPage from "@/pages/MenuPage";
import AuthScreen from "@/providers/AuthProvider/helpers/jsx/AuthScreen";
import AuthScreensLayout from "@/pages/AuthPages/AuthScreensLayout";
import LogIn from "@/pages/AuthPages/LogIn";
import SignUp from "@/pages/AuthPages/SignUp";
import AdminPage from "@/pages/AdminPage";
import AuthorizedRoute from "@/providers/AuthProvider/helpers/jsx/AuthorizedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate replace to={routes.home.path} />} />

      <Route path={routes.home.path} element={<HomePage />} />

      <Route path={routes.menu.path} element={<MenuPage />} />

      <Route
        path={routes.admin.path}
        element={
          <AuthorizedRoute>
            <AdminPage />
          </AuthorizedRoute>
        }
      />

      <Route
        element={
          // route restriction handled here
          <AuthScreen>
            <AuthScreensLayout />
          </AuthScreen>
        }
      >
        <Route element={<LogIn />} path={routes.auth_login.path} />
        <Route element={<SignUp />} path={routes.auth_signup.path} />
      </Route>

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
