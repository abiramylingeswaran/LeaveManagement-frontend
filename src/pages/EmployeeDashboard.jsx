import { Link } from "react-router-dom";
import { CalendarPlus, Clock, CalendarDays, PlaneTakeoff } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { leaveTypes, leaveBalances, holidays } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function EmployeeDashboard() {
  const { requests, profile } = useApp();
  const myRequests = requests.filter((r) => r.employeeId === profile.id).slice(0, 4);
  const myBalances = leaveBalances[profile.id] || [];
  const pendingCount = requests.filter((r) => r.employeeId === profile.id && r.status === "Pending").length;
  const upcoming = requests.find(
    (r) => r.employeeId === profile.id && r.status === "Approved" && new Date(r.start) > new Date("2026-09-01")
  );

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Your leave, at a glance</h1>
          <p>Track balances, submit requests, and see what's coming up.</p>
        </div>
        <Link to="/apply" className="btn btn-primary">
          <CalendarPlus size={16} />
          Apply for leave
        </Link>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <StatCard icon={Clock} label="Pending requests" value={pendingCount} sub="Awaiting manager review" accent />
        <StatCard
          icon={PlaneTakeoff}
          label="Upcoming leave"
          value={upcoming ? upcoming.start.slice(5) : "—"}
          sub={upcoming ? `${upcoming.days} day(s) · ${leaveTypes.find((t) => t.id === upcoming.typeId)?.name}` : "Nothing scheduled"}
        />
        <StatCard icon={CalendarDays} label="Next holiday" value={holidays[0].date.slice(5)} sub={holidays[0].name} />
        <StatCard label="Leave types" value={myBalances.length} sub="Configured for your category" />
      </div>

      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <div className="card">
          <div className="card-title-row">
            <h3>Leave balances</h3>
            <span className="hint">2026 cycle</span>
          </div>
          {myBalances.map((b) => {
            const type = leaveTypes.find((t) => t.id === b.typeId);
            const available = b.entitled + b.carryForward + b.adjustments - b.used - b.pending;
            const total = b.entitled + b.carryForward + b.adjustments;
            const pct = total ? Math.max(4, Math.round(((total - b.used - b.pending) / total) * 100)) : 0;
            return (
              <div key={b.typeId} className="leave-type-row" style={{ display: "block" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="leave-type-name">
                    <span className="dot" style={{ background: type.color }} />
                    {type.name}
                  </div>
                  <div style={{ fontWeight: 600 }}>{available} left</div>
                </div>
                <div className="hint">
                  Entitled {b.entitled} + carry-forward {b.carryForward} · used {b.used} · pending {b.pending}
                </div>
                <div className="balance-bar-track">
                  <div className="balance-bar-fill" style={{ width: `${pct}%`, background: type.color }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <div className="card-title-row">
            <h3>Recent requests</h3>
            <Link to="/history" className="hint">
              View all
            </Link>
          </div>
          <div className="table-wrap">
            <table>
              <tbody>
                {myRequests.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{leaveTypes.find((t) => t.id === r.typeId)?.name}</div>
                      <div className="cell-muted">{r.start === r.end ? r.start : `${r.start} → ${r.end}`}</div>
                    </td>
                    <td>{r.days}d</td>
                    <td>
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-title-row">
          <h3>Company holidays</h3>
        </div>
        <div className="tag-list">
          {holidays.map((h) => (
            <span key={h.date} className="badge badge-pending" style={{ background: "var(--amber-soft)" }}>
              {h.date} · {h.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
