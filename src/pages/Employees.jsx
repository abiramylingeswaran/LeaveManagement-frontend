import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { employees } from "../data/mockData";
import { useApp } from "../context/AppContext";

const statusClass = { Active: "badge-approved", Probation: "badge-pending", Inactive: "badge-cancelled" };

export default function Employees() {
  const { role } = useApp();
  const [query, setQuery] = useState("");
  const filtered = employees.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()) || e.department.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{role === "admin" ? "Users & roles" : "Employees"}</h1>
          <p>{role === "admin" ? "Manage system accounts and permissions." : "Directory of employees across departments."}</p>
        </div>
        <button className="btn btn-primary">
          <UserPlus size={16} />
          {role === "admin" ? "Add user" : "Add employee"}
        </button>
      </div>

      <div className="card">
        <div className="field" style={{ marginBottom: 18, maxWidth: 320 }}>
          <div style={{ position: "relative" }}>
            <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: "var(--ink-muted)" }} />
            <input
              className="input"
              style={{ paddingLeft: 32 }}
              placeholder="Search by name or department"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Manager</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td className="cell-muted">{e.id}</td>
                  <td style={{ fontWeight: 500 }}>{e.name}</td>
                  <td>{e.department}</td>
                  <td>{e.designation}</td>
                  <td className="cell-muted">{e.manager}</td>
                  <td className="cell-muted">{e.joined}</td>
                  <td>
                    <span className={`badge ${statusClass[e.status]}`}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
