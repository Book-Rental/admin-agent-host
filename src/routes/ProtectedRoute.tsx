import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { AppRole } from "../store/services/Slices/authSlice";

interface Props {
  allowedRoles: AppRole[];
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (!role) return <Navigate to="/auth" replace />;
  // if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;