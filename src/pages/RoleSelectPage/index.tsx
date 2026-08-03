import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../store/services/Slices/authSlice";
import type { RootState } from "../../store/store";

const RoleSelectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    navigate("/auth", { replace: true });
    return null;
  }

  const choose = (role: "admin" | "agent") => {
    dispatch(setRole(role));
    navigate(role === "admin" ? "/admin" : "/agent", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div>
        <h2 className="text-xl font-semibold">Welcome, {userInfo?.firstName}</h2>
        <p className="text-gray-500 text-sm">Continue as:</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => choose("admin")}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Admin
        </button>
        <button
          onClick={() => choose("agent")}
          className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50"
        >
          Agent
        </button>
      </div>
    </div>
  );
};

export default RoleSelectPage;