import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import AuthPage from "../pages/AuthPage";
import RoleSelectPage from "../pages/RoleSelectPage";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../modules/mainModule";
import Admin from "../pages/Admin";
import Agent from "../pages/Agent";

const RootRedirect = () => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (!role) return <Navigate to="/select-role" replace />;
  return <Navigate to={role === "admin" ? "/admin" : "/agent"} replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootRedirect />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/select-role" element={<RoleSelectPage />} />
    <Route path="/unauthorized" element={<div>Not authorized</div>} />

    <Route element={<MainLayout />}>
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/*"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <Agent />
          </ProtectedRoute>
        }
      />
    </Route>

    {/* catch-all for any unmatched path */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;