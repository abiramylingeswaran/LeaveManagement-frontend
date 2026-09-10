import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeafMark from "../components/LeafMark";
import { departments } from "../data/mockData";
import { useApp } from "../context/AppContext";

export default function Register() {
  const { setRole } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: departments[0],
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    // New accounts start as Employee — HR upgrades roles from the Employees page.
    setRole("employee");
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
          Set up your account in a minute — your leave balances are ready as
          soon as HR adds you to a department.
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
          <h1>Create your account</h1>
          <p className="lede">Register with your work email to get started.</p>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              className="input"
              id="name"
              placeholder="e.g. Abiramy Lingeswaran"
              value={form.name}
              onChange={update("name")}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="reg-email">Work email</label>
            <input
              className="input"
              id="reg-email"
              type="email"
              placeholder="you@company.lk"
              value={form.email}
              onChange={update("email")}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="department">Department</label>
            <select id="department" value={form.department} onChange={update("department")}>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="reg-password">Password</label>
              <input
                className="input"
                id="reg-password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={update("password")}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                className="input"
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={update("confirmPassword")}
                required
              />
            </div>
          </div>

          {error && (
            <p className="hint" style={{ color: "var(--brick)", marginBottom: 14 }}>
              {error}
            </p>
          )}

          <button className="btn btn-primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>
            Create account
          </button>

          <p className="hint" style={{ marginTop: 14, textAlign: "center" }}>
            Already have an account? <Link to="/login" style={{ color: "var(--forest)", fontWeight: 500 }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}