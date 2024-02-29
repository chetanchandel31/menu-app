import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import MenuPage from "@/pages/MenuPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate replace to={routes.home.path} />} />

      <Route path={routes.home.path} element={<HomePage />} />

      <Route path={routes.menu.path} element={<MenuPage />} />

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
