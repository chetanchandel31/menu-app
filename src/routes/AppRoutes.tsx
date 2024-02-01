import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import NavigationLayout from "../components/layouts/NavigationLayout";
import LexicalTest from "@/pages/LexicalTest";
import NotFound from "@/pages/NotFound";
import AuthScreen from "@/providers/AuthProvider/helpers/jsx/AuthScreen";
import AuthorizedRoute from "@/providers/AuthProvider/helpers/jsx/AuthorizedRoute";
import AuthForm from "@/components/AuthForm";

function EmptyOutletWrapper() {
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={<Navigate replace to={routes.habits.path} />}
      />

      <Route
        element={
          <AuthorizedRoute>
            <NavigationLayout />
          </AuthorizedRoute>
        }
      >
        <Route path={routes.settings.path} element={<>settings</>} />

        <Route path={routes.lexicalTest.path} element={<LexicalTest />} />
      </Route>

      <Route
        element={
          // route restriction handled here
          <AuthScreen>
            <EmptyOutletWrapper />
          </AuthScreen>
        }
      >
        <Route element={<AuthForm />} path={routes.auth_login.path} />
        <Route element={<AuthForm />} path={routes.auth_signup.path} />
      </Route>

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
