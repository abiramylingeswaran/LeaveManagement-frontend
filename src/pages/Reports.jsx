import { Download } from "lucide-react";
import { departmentUsage, auditLog } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function Reports() {
  const { role } = useApp();

  if (role === "admin") {
    return (
      <>
        <div className="page-head">
          <div>
            <h1>Audit log</h1>
            <p>A record of sensitive actions across the system. Not editable.</p>
          </div>
        </div>
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Record</th>
                  <th>Previous</th>
                  <th>New</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((a) => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 500 }}>{a.user}</td>
                    <td>{a.action}</td>
                    <td className="cell-muted">{a.record}</td>
                    <td className="cell-muted">{a.previous}</td>
                    <td className="cell-muted">{a.next}</td>
                    <td className="cell-muted">{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Reports &amp; analytics</h1>
          <p>Export leave data for payroll, audits, or management review.</p>
        </div>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 16 }}>
        {["Employee leave history", "Department absence trends", "Monthly leave statistics"].map((r) => (
          <div key={r} className="card">
            <h3 style={{ marginBottom: 8, fontSize: "0.95rem" }}>{r}</h3>
            <p className="hint" style={{ marginBottom: 14 }}>
              Ready to export for the current reporting period.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm">
                <Download size={13} />
                PDF
              </button>
              <button className="btn btn-ghost btn-sm">
                <Download size={13} />
                Excel
              </button>
              <button className="btn btn-ghost btn-sm">
                <Download size={13} />
                CSV
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title-row">
          <h3>Department absence trend</h3>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Headcount</th>
                <th>Days used</th>
                <th>Avg. per employee</th>
              </tr>
            </thead>
            <tbody>
              {departmentUsage.map((d) => (
                <tr key={d.department}>
                  <td style={{ fontWeight: 500 }}>{d.department}</td>
                  <td>{d.headcount}</td>
                  <td>{d.used}</td>
                  <td className="cell-muted">{(d.used / d.headcount).toFixed(1)} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
