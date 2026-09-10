import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { holidays as initialHolidays } from "../data/mockData";

export default function Holidays() {
  const [holidays, setHolidays] = useState(initialHolidays);
  const [form, setForm] = useState({ date: "", name: "", type: "Public" });

  const addHoliday = (e) => {
    e.preventDefault();
    if (!form.date || !form.name) return;
    setHolidays((prev) => [...prev, form].sort((a, b) => a.date.localeCompare(b.date)));
    setForm({ date: "", name: "", type: "Public" });
  };

  const remove = (date) => setHolidays((prev) => prev.filter((h) => h.date !== date));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Holiday calendar</h1>
          <p>Configure public, bank, and company-specific holidays for the year.</p>
        </div>
      </div>

      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <div className="card">
          <div className="card-title-row">
            <h3>2026 holidays</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {holidays.map((h) => (
                  <tr key={h.date}>
                    <td className="cell-muted">{h.date}</td>
                    <td style={{ fontWeight: 500 }}>{h.name}</td>
                    <td>
                      <span className="badge badge-pending" style={{ background: "var(--amber-soft)" }}>
                        {h.type}
                      </span>
                    </td>
                    <td>
                      <button className="icon-btn" onClick={() => remove(h.date)} aria-label="Remove">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form className="card" onSubmit={addHoliday}>
          <h3 style={{ marginBottom: 14 }}>Add a holiday</h3>
          <div className="field">
            <label>Date</label>
            <input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div className="field">
            <label>Name</label>
            <input
              className="input"
              placeholder="e.g. Deepavali"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Public</option>
              <option>Bank</option>
              <option>Mercantile</option>
              <option>Company</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            <Plus size={15} />
            Add holiday
          </button>
        </form>
      </div>
    </>
  );
}
