import { Users, CalendarClock, ClipboardList, TrendingUp } from "lucide-react";
import StatCard from "../components/StatCard";
import { leaveTypes, orgStats, departmentUsage } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function HRDashboard() {
  const { requests } = useApp();
  const typeCounts = leaveTypes.map((t) => ({
    ...t,
    count: requests.filter((r) => r.typeId === t.id).length,
  }));
  const maxTypeCount = Math.max(...typeCounts.map((t) => t.count), 1);
  const maxDept = Math.max(...departmentUsage.map((d) => d.used), 1);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>HR overview</h1>
          <p>Organization-wide leave activity for September 2026.</p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <StatCard icon={Users} label="Total employees" value={orgStats.totalEmployees} accent />
        <StatCard icon={CalendarClock} label="On leave today" value={orgStats.onLeaveToday} />
        <StatCard icon={ClipboardList} label="Pending requests" value={orgStats.pendingRequests} />
        <StatCard icon={TrendingUp} label="Requests this month" value={orgStats.monthlyRequests} />
      </div>

      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <div className="card">
          <div className="card-title-row">
            <h3>Leave-type distribution</h3>
            <span className="hint">Current cycle</span>
          </div>
          {typeCounts.map((t) => (
            <div key={t.id} className="leave-type-row" style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div className="leave-type-name">
                  <span className="dot" style={{ background: t.color }} />
                  {t.name}
                </div>
                <span className="cell-muted">{t.count} requests</span>
              </div>
              <div className="balance-bar-track">
                <div className="balance-bar-fill" style={{ width: `${(t.count / maxTypeCount) * 100}%`, background: t.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title-row">
            <h3>Department leave usage</h3>
            <span className="hint">Days used this year</span>
          </div>
          {departmentUsage.map((d) => (
            <div key={d.department} className="leave-type-row" style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 500 }}>{d.department}</span>
                <span className="cell-muted">
                  {d.used} days · {d.headcount} staff
                </span>
              </div>
              <div className="balance-bar-track">
                <div className="balance-bar-fill" style={{ width: `${(d.used / maxDept) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
