import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  CalendarPlus,
  History,
  CalendarDays,
  ClipboardCheck,
  Users,
  BarChart3,
  Settings,
  ShieldCheck,
} from "lucide-react";
import LeafMark from "./LeafMark";
import { useApp } from "../context/AppContext";

const navByRole = {
  employee: [
    { to: "/", label: "Dashboard", icon: LayoutGrid },
    { to: "/apply", label: "Apply for Leave", icon: CalendarPlus },
    { to: "/history", label: "Leave History", icon: History },
    { to: "/calendar", label: "Team Calendar", icon: CalendarDays },
  ],
  manager: [
    { to: "/", label: "Dashboard", icon: LayoutGrid },
    { to: "/approvals", label: "Approvals", icon: ClipboardCheck },
    { to: "/calendar", label: "Team Calendar", icon: CalendarDays },
    { to: "/history", label: "Team History", icon: History },
  ],
  hr: [
    { to: "/", label: "HR Dashboard", icon: LayoutGrid },
    { to: "/employees", label: "Employees", icon: Users },
    { to: "/holidays", label: "Holidays", icon: CalendarDays },
    { to: "/reports", label: "Reports", icon: BarChart3 },
  ],
  admin: [
    { to: "/", label: "Overview", icon: LayoutGrid },
    { to: "/employees", label: "Users & Roles", icon: ShieldCheck },
    { to: "/reports", label: "Audit Log", icon: BarChart3 },
    { to: "/settings", label: "Settings", icon: Settings },
  ],
};

const roles = [
  { id: "employee", label: "Employee" },
  { id: "manager", label: "Manager" },
  { id: "hr", label: "HR" },
  { id: "admin", label: "Admin" },
];

export default function Sidebar() {
  const { role, setRole } = useApp();
  const links = navByRole[role];

  return (
    <aside className="sidebar">
      <div className="brand">
        <LeafMark light />
        <div>
          <div className="brand-name">LeafHR</div>
          <div className="brand-sub">Leave &amp; Workforce</div>
        </div>
      </div>

      <nav className="nav-group">
        <div className="nav-label">Menu</div>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">
        <div className="role-switch">
          <div className="role-switch-label">Preview as</div>
          <div className="role-pill-row">
            {roles.map((r) => (
              <button
                key={r.id}
                className={"role-pill" + (role === r.id ? " active" : "")}
                onClick={() => setRole(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
