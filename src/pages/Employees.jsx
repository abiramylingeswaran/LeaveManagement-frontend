import { useState } from "react";
import { Search, UserPlus, X } from "lucide-react";
import { employees as initialEmployees, departments } from "../data/mockData";
import { useApp } from "../context/AppContext";

const statusClass = {
  Active: "badge-approved",
  Probation: "badge-pending",
  Inactive: "badge-cancelled",
};

const emptyForm = {
  name: "",
  department: departments[0],
  designation: "",
  manager: "",
  status: "Active",
};

export default function Employees() {
  const { role } = useApp();
  const [employees, setEmployees] = useState(initialEmployees);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.department.toLowerCase().includes(query.toLowerCase())
  );

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.designation) return;

    const nextId = `EMP-${1000 + employees.length + 1}`;
    setEmployees((prev) => [
      ...prev,
      {
        id: nextId,
        name: form.name,
        department: form.department,
        designation: form.designation,
        manager: form.manager || "Unassigned",
        status: form.status,
        joined: new Date().toISOString().slice(0, 10),
      },
    ]);
    setForm(emptyForm);
    setModalOpen(false);
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{role === "admin" ? "Users & roles" : "Employees"}</h1>
          <p>
            {role === "admin"
              ? "Manage system accounts and permissions."
              : "Directory of employees across departments."}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <UserPlus size={16} />
          {role === "admin" ? "Add user" : "Add employee"}
        </button>
      </div>

      <div className="card">
        <div className="field" style={{ marginBottom: 18, maxWidth: 320 }}>
          <div style={{ position: "relative" }}>
            <Search
              size={15}
              style={{ position: "absolute", left: 10, top: 10, color: "var(--ink-muted)" }}
            />
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
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="empty-state">No employees match your search.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 440 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h3>{role === "admin" ? "Add user" : "Add employee"}</h3>
              <button
                className="icon-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAdd}>
              <div className="field">
                <label>Full name</label>
                <input
                  className="input"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="e.g. Nadeesha Perera"
                  required
                />
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Department</label>
                  <select value={form.department} onChange={update("department")}>
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Designation</label>
                  <input
                    className="input"
                    value={form.designation}
                    onChange={update("designation")}
                    placeholder="e.g. QA Analyst"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Reporting manager</label>
                  <input
                    className="input"
                    value={form.manager}
                    onChange={update("manager")}
                    placeholder="Optional"
                  />
                </div>
                <div className="field">
                  <label>Status</label>
                  <select value={form.status} onChange={update("status")}>
                    <option>Active</option>
                    <option>Probation</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 8,
                }}
              >
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {role === "admin" ? "Create user" : "Add employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}