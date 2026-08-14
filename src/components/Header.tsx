import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { logout } from "../store/services/Slices/authSlice";
import type { RootState } from "../store/store";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const initial = userInfo?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 h-16 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-slate-900 tracking-tight">
          Logistics<span className="text-blue-600">Admin</span>
        </span>
      </div>

      <div
        className="relative z-50"
        ref={menuRef}
      >
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
            {initial}
          </div>

          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${
              menuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {menuOpen && (
          <div
            className="
              fixed
              top-16
              right-2
              w-60
              bg-white
              rounded-xl
              shadow-lg
              border
              border-gray-100
              py-2
              z-[99999]
            "
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-sm text-slate-900 truncate">
                {userInfo?.email}
              </p>

              <p className="text-xs text-gray-400 mt-0.5">
                Role: {userInfo?.role}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;