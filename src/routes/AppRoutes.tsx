import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate replace to={routes.home.path} />} />

      <Route path={routes.home.path} element={<Home />} />

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
