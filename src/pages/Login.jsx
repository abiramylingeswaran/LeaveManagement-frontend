import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeafMark from "../components/LeafMark";
import { useApp } from "../context/AppContext";

const roleOptions = [
  { id: "employee", name: "Employee", desc: "Apply & track leave" },
  { id: "manager", name: "Manager", desc: "Approve team requests" },
  { id: "hr", name: "HR Officer", desc: "Policies & reports" },
  { id: "admin", name: "Administrator", desc: "System configuration" },
];

export default function Login() {
  const { setRole } = useApp();
  const [selected, setSelected] = useState("employee");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRole(selected);
    navigate("/");
  };

  return (
    <div className="login-screen">
      <div className="login-visual">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LeafMark light size={30} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600 }}>
            LeafHR
          </span>
        </div>
        <p className="login-visual-quote">
          One calendar for every leave, holiday and approval — built around how
          Sri Lankan offices actually work.
        </p>
        <div style={{ fontSize: "0.8rem", color: "#9fc2ac" }}>
          Leave &amp; Workforce Management Platform
        </div>
        <div className="login-visual-leaf">
          <LeafMark light size={260} />
        </div>
      </div>

      <div className="login-form-side">
        <form className="login-box" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <p className="lede">Choose a role to preview its dashboard.</p>

          <div className="role-select-grid">
            {roleOptions.map((r) => (
              <div
                key={r.id}
                className={"role-select-card" + (selected === r.id ? " selected" : "")}
                onClick={() => setSelected(r.id)}
                role="button"
                tabIndex={0}
              >
                <div className="rn">{r.name}</div>
                <div className="rd">{r.desc}</div>
              </div>
            ))}
          </div>

          <div className="field">
            <label htmlFor="email">Work email</label>
            <input className="input" id="email" type="email" placeholder="you@company.lk" defaultValue="abiramy@leafhr.lk" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input className="input" id="password" type="password" placeholder="••••••••" defaultValue="password" />
          </div>

          <button className="btn btn-primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>
            Sign in to LeafHR
          </button>
          <p className="hint" style={{ marginTop: 14, textAlign: "center" }}>
            Demo build — no real authentication is performed.
          </p>
        </form>
      </div>
    </div>
  );
}
