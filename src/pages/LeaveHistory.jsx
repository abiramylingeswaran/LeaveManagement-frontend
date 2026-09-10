import { useState } from "react";
import { X } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { leaveTypes } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function LeaveHistory() {
  const { requests, profile, role, updateRequestStatus } = useApp();
  const [filter, setFilter] = useState("All");

  const scoped = role === "employee" ? requests.filter((r) => r.employeeId === profile.id) : requests;
  const filtered = filter === "All" ? scoped : scoped.filter((r) => r.status === filter);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{role === "employee" ? "Your leave history" : "Team leave history"}</h1>
          <p>Every request, its status, and how it was decided.</p>
        </div>
      </div>

      <div className="tabs">
        {["All", "Pending", "Approved", "Rejected", "Cancelled"].map((f) => (
          <button key={f} className={"tab-btn" + (filter === f ? " active" : "")} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {role !== "employee" && <th>Employee</th>}
                <th>Type</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Applied on</th>
                <th>Status</th>
                {role === "employee" && <th></th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  {role !== "employee" && <td>{r.employee}</td>}
                  <td>{leaveTypes.find((t) => t.id === r.typeId)?.name}</td>
                  <td>{r.start === r.end ? r.start : `${r.start} → ${r.end}`}</td>
                  <td>{r.days}</td>
                  <td className="cell-muted">{r.reason}</td>
                  <td className="cell-muted">{r.appliedOn}</td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                  {role === "employee" && (
                    <td>
                      {r.status === "Pending" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => updateRequestStatus(r.id, "Cancelled")}
                        >
                          <X size={13} />
                          Cancel
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">No requests match this filter.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
