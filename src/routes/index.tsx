import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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
  return <Navigate to={role === "admin" ? "/admin" : "/agent/pickup-orders"} replace />;
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
            <Admin view="admin" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agents"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin view="agents" />
          </ProtectedRoute>
        }
      />

      {/* Create Agent */}
      <Route
        path="/agents/new"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin view="create-agent" />
          </ProtectedRoute>
        }
      />

      {/* Agent Details */}
      <Route
        path="/agents/:agentId"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin view="agent-details" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin view="orders" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin view="order-details" />
          </ProtectedRoute>
        }
      />

      {/* Edit Agent */}
      <Route
        path="/agents/:agentId/edit"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin view="edit-agent" />
          </ProtectedRoute>
        }
      />


      <Route
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="/agent/pickup-orders" element={<Agent module="pickup" view="orders" />} />
        <Route path="/agent/pickup-orders/:shipmentId" element={<Agent module="pickup" view="details" />} />
        <Route path="/agent/pickup-orders/:shipmentId/pickup-verification" element={<Agent module="pickup" view="verification" />} />
        <Route path="/agent/pickup-orders/:shipmentId/confirmation" element={<Agent module="pickup" view="confirmation" />} />
        <Route path="/agent/delivery-orders" element={<Agent module="delivery" view="orders" />} />
        <Route path="/agent/delivery-orders/:shipmentId" element={<Agent module="delivery" view="details" />} />
        <Route path="/agent/delivery-orders/:shipmentId/delivery-verification" element={<Agent module="delivery" view="verification" />} />
        <Route path="/agent/delivery-orders/:shipmentId/confirmation" element={<Agent module="delivery" view="confirmation" />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;