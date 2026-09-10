import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import TeamCalendar from "./pages/TeamCalendar";
import ManagerDashboard from "./pages/ManagerDashboard";
import HRDashboard from "./pages/HRDashboard";
import Employees from "./pages/Employees";
import Holidays from "./pages/Holidays";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { useApp } from "./context/AppContext";

function DashboardForRole() {
  const { role } = useApp();
  if (role === "manager") return <ManagerDashboard />;
  if (role === "hr" || role === "admin") return <HRDashboard />;
  return <EmployeeDashboard />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardForRole />} />
        <Route path="/apply" element={<ApplyLeave />} />
        <Route path="/history" element={<LeaveHistory />} />
        <Route path="/calendar" element={<TeamCalendar />} />
        <Route path="/approvals" element={<ManagerDashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
