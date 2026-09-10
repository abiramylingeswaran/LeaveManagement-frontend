import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext";
import { notifications } from "../data/mockData";

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Topbar() {
  const { profile } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="topbar">
      <div className="topbar-greeting">
        Good day, <strong>{profile.name.split(" ")[0]}</strong> — {profile.title}
      </div>
      <div className="topbar-right">
        <div style={{ position: "relative" }}>
          <button className="icon-btn" onClick={() => setOpen((o) => !o)} aria-label="Notifications">
            <Bell size={16} />
            <span className="notif-dot" />
          </button>
          {open && (
            <div
              className="modal"
              style={{
                position: "absolute",
                right: 0,
                top: 44,
                width: 300,
                padding: 14,
                zIndex: 20,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 10, fontSize: "0.86rem" }}>Notifications</div>
              {notifications.map((n) => (
                <div key={n.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--line-soft)" }}>
                  <div style={{ fontSize: "0.82rem" }}>{n.text}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: 2 }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="avatar">{initials(profile.name)}</div>
          <ChevronDown size={15} color="var(--ink-muted)" />
        </div>
      </div>
    </div>
  );
}
