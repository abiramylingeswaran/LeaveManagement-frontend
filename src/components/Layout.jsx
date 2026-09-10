import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="shell">
      <Sidebar />
      <div>
        <Topbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
