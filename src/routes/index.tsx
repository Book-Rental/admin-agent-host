import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../modules/mainModule";
import Admin from "../pages/Admin";
import Agent from "../pages/Agent";
import { ScrollToTop } from "../components/ScrollToTop";

const RootRedirect = () => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!role) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Navigate
      to={role === "AGENT" ? "/agent/pickup-orders" : "/admin"}
      replace
    />
  );
};

const AppRoutes = () => (
  <>
    <ScrollToTop />

    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<RootRedirect />} />

      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/unauthorized"
        element={<div>Not authorized</div>}
      />

      {/* Main Layout */}
      <Route element={<MainLayout />}>

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="admin" />
            </ProtectedRoute>
          }
        />

        {/* Delivery Agents */}
        <Route
          path="/agents"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="agents" />
            </ProtectedRoute>
          }
        />

        {/* Create Agent */}
        <Route
          path="/agents/new"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="create-agent" />
            </ProtectedRoute>
          }
        />

        {/* Agent Details */}
        <Route
          path="/agents/:agentId"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="agent-details" />
            </ProtectedRoute>
          }
        />

        {/* Edit Agent */}
        <Route
          path="/agents/:agentId/edit"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="edit-agent" />
            </ProtectedRoute>
          }
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="orders" />
            </ProtectedRoute>
          }
        />

        {/* Order Details */}
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="order-details" />
            </ProtectedRoute>
          }
        />

        {/* Destination Shipments */}
        <Route
          path="/destination-shipments"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="destination-shipments" />
            </ProtectedRoute>
          }
        />

        {/* Hubs */}
        <Route
          path="/hubs"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="hubs" />
            </ProtectedRoute>
          }
        />

        {/* Hub Details */}
        <Route
          path="/hubs/:hubId"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "HUB_MANAGER"]}
            >
              <Admin view="hub-details" />
            </ProtectedRoute>
          }
        />

        {/* ================= AGENT ROUTES ================= */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["AGENT"]}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          {/* Pickup Orders */}
          <Route
            path="/agent/pickup-orders"
            element={
              <Agent
                module="pickup"
                view="orders"
              />
            }
          />

          <Route
            path="/agent/pickup-orders/:shipmentId"
            element={
              <Agent
                module="pickup"
                view="details"
              />
            }
          />

          <Route
            path="/agent/pickup-orders/:shipmentId/pickup-verification"
            element={
              <Agent
                module="pickup"
                view="verification"
              />
            }
          />

          <Route
            path="/agent/pickup-orders/:shipmentId/confirmation"
            element={
              <Agent
                module="pickup"
                view="confirmation"
              />
            }
          />

          {/* Delivery Orders */}
          <Route
            path="/agent/delivery-orders"
            element={
              <Agent
                module="delivery"
                view="orders"
              />
            }
          />

          <Route
            path="/agent/delivery-orders/:shipmentId"
            element={
              <Agent
                module="delivery"
                view="details"
              />
            }
          />

          <Route
            path="/agent/delivery-orders/:shipmentId/delivery-verification"
            element={
              <Agent
                module="delivery"
                view="verification"
              />
            }
          />

          <Route
            path="/agent/delivery-orders/:shipmentId/confirmation"
            element={
              <Agent
                module="delivery"
                view="confirmation"
              />
            }
          />
        </Route>
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  </>
);

export default AppRoutes;