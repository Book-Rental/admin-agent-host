import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <div className="p-6 max-w-7xl mx-auto">
      <Outlet />
    </div>
  </div>
);

export default MainLayout;