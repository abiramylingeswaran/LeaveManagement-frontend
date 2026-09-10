import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { holidays, leaveTypes } from "../data/mockData";
import { useApp } from "../context/AppContext";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function TeamCalendar() {
  const { requests } = useApp();
  const [cursor, setCursor] = useState(new Date(2026, 8, 1)); // September 2026
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = buildMonth(year, month);
  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const approved = requests.filter((r) => r.status === "Approved" || r.status === "Pending");

  const dateStr = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const eventsFor = (d) => {
    const ds = dateStr(d);
    return approved.filter((r) => ds >= r.start && ds <= r.end);
  };

  const holidayFor = (d) => holidays.find((h) => h.date === dateStr(d));

  const shift = (delta) => setCursor(new Date(year, month + delta, 1));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Team leave calendar</h1>
          <p>See who's away and which days are company holidays.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="icon-btn" onClick={() => shift(-1)}>
            <ChevronLeft size={16} />
          </button>
          <strong style={{ minWidth: 150, textAlign: "center" }}>{monthLabel}</strong>
          <button className="icon-btn" onClick={() => shift(1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="card">
        <div className="cal-grid" style={{ marginBottom: 4 }}>
          {DOW.map((d) => (
            <div key={d} className="cal-dow">
              {d}
            </div>
          ))}
        </div>
        <div className="cal-grid">
          {cells.map((d, i) => {
            if (!d) return <div key={i} />;
            const dow = new Date(year, month, d).getDay();
            const weekend = dow === 0 || dow === 6;
            const holiday = holidayFor(d);
            const events = eventsFor(d);
            return (
              <div key={i} className={"cal-cell" + (weekend ? " weekend" : "") + (holiday ? " holiday" : "")}>
                <div className="cal-date">{d}</div>
                {holiday && <span className="cal-chip" style={{ background: "var(--amber-soft)", color: "var(--amber)" }}>{holiday.name}</span>}
                {events.slice(0, 2).map((e) => (
                  <span key={e.id} className="cal-chip" title={e.employee}>
                    {e.employee.split(" ")[0]}
                  </span>
                ))}
                {events.length > 2 && <span className="hint">+{events.length - 2} more</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-title-row">
          <h3>Legend</h3>
        </div>
        <div className="tag-list">
          {leaveTypes.map((t) => (
            <span key={t.id} className="tag-list" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem" }}>
              <span className="dot" style={{ background: t.color }} />
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
