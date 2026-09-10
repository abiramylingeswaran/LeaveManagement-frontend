import { useState } from "react";
import { Users, ClipboardCheck, CalendarClock, AlertTriangle, Check, X } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { leaveTypes, employees } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function ManagerDashboard() {
  const { requests, updateRequestStatus } = useApp();
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");

  const pending = requests.filter((r) => r.status === "Pending");
  const teamSize = employees.length;
  const onLeaveToday = requests.filter((r) => r.status === "Approved" && "2026-09-10" >= r.start && "2026-09-10" <= r.end).length;
  const highAbsence = onLeaveToday / teamSize > 0.3;

  const confirmReject = (id) => {
    updateRequestStatus(id, "Rejected");
    setRejecting(null);
    setReason("");
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Team approvals</h1>
          <p>Review pending requests and keep an eye on team availability.</p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        <StatCard icon={ClipboardCheck} label="Pending approvals" value={pending.length} accent />
        <StatCard icon={Users} label="Team members" value={teamSize} />
        <StatCard icon={CalendarClock} label="On leave today" value={onLeaveToday} sub={highAbsence ? "High absence — review coverage" : "Within normal range"} />
        <StatCard label="Upcoming this week" value={pending.filter((r) => r.start <= "2026-09-16").length} />
      </div>

      {highAbsence && (
        <div className="card" style={{ borderColor: "var(--amber)", background: "var(--amber-soft)", display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
          <AlertTriangle size={18} color="var(--amber)" />
          <span style={{ fontSize: "0.88rem" }}>
            More than 30% of your team is on leave today. New requests for this period may need extra review.
          </span>
        </div>
      )}

      <div className="card">
        <div className="card-title-row">
          <h3>Pending requests</h3>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Reason</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pending.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{r.employee}</div>
                    <div className="cell-muted">{r.department}</div>
                  </td>
                  <td>{leaveTypes.find((t) => t.id === r.typeId)?.name}</td>
                  <td>{r.start === r.end ? r.start : `${r.start} → ${r.end}`}</td>
                  <td>{r.days}</td>
                  <td className="cell-muted">{r.reason}</td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => updateRequestStatus(r.id, "Approved")}>
                        <Check size={13} />
                        Approve
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setRejecting(r.id)}>
                        <X size={13} />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">No pending requests — you're all caught up.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-title-row">
          <h3>Recent decisions</h3>
        </div>
        <div className="table-wrap">
          <table>
            <tbody>
              {requests
                .filter((r) => r.status !== "Pending")
                .slice(0, 5)
                .map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 500 }}>{r.employee}</td>
                    <td className="cell-muted">{leaveTypes.find((t) => t.id === r.typeId)?.name}</td>
                    <td className="cell-muted">{r.start}</td>
                    <td>
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {rejecting && (
        <div className="modal-backdrop" onClick={() => setRejecting(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 12 }}>Reject this request?</h3>
            <div className="field">
              <label>Reason for rejection</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Let the employee know why" />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setRejecting(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => confirmReject(rejecting)}>
                Confirm rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
