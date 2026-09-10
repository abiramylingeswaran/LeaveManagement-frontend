import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { leaveTypes } from "../data/mockData";
import { useApp } from "../context/AppContext";

const durationOptions = ["Full day", "Morning half", "Afternoon half"];

export default function ApplyLeave() {
  const { addRequest, profile } = useApp();
  const navigate = useNavigate();
  const [typeId, setTypeId] = useState(leaveTypes[0].id);
  const [duration, setDuration] = useState("Full day");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reason, setReason] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const days =
    duration !== "Full day"
      ? 0.5
      : start && end
      ? Math.max(1, (new Date(end) - new Date(start)) / 86400000 + 1)
      : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest({
      employeeId: profile.id,
      employee: profile.name,
      department: "Engineering",
      typeId,
      start: start || "2026-09-20",
      end: duration === "Full day" ? end || start || "2026-09-20" : start || "2026-09-20",
      days,
      half: duration !== "Full day" ? duration.replace(" half", "") : null,
      reason,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card empty-state" style={{ maxWidth: 480, margin: "60px auto" }}>
        <CheckCircle2 size={40} color="var(--forest)" style={{ marginBottom: 12 }} />
        <h2 style={{ marginBottom: 8 }}>Request submitted</h2>
        <p style={{ marginBottom: 20 }}>
          Your leave request has been sent to your manager for approval. You'll get a
          notification once it's reviewed.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="btn btn-ghost" onClick={() => setSubmitted(false)}>
            Submit another
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/history")}>
            View leave history
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Apply for leave</h1>
          <p>Fill in the details below — your manager is notified as soon as you submit.</p>
        </div>
      </div>

      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <form className="card" onSubmit={handleSubmit}>
          <div className="field">
            <label>Leave type</label>
            <select className="" value={typeId} onChange={(e) => setTypeId(e.target.value)}>
              {leaveTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Duration</label>
            <div className="radio-row">
              {durationOptions.map((d) => (
                <div
                  key={d}
                  className={"radio-chip" + (duration === d ? " selected" : "")}
                  onClick={() => setDuration(d)}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Start date</label>
              <input className="input" type="date" value={start} onChange={(e) => setStart(e.target.value)} required />
            </div>
            {duration === "Full day" && (
              <div className="field">
                <label>End date</label>
                <input className="input" type="date" value={end} onChange={(e) => setEnd(e.target.value)} required />
              </div>
            )}
          </div>

          <div className="field">
            <label>Reason</label>
            <textarea
              placeholder="Briefly describe the reason for this leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Supporting document (optional)</label>
            <label
              className="btn btn-ghost"
              style={{ cursor: "pointer", width: "fit-content" }}
              htmlFor="upload"
            >
              <UploadCloud size={15} />
              {fileName || "Attach file"}
            </label>
            <input
              id="upload"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFileName(e.target.files[0]?.name || "")}
            />
            <span className="hint">Required for medical leave beyond 1 day.</span>
          </div>

          <div className="divider" />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="hint">Estimated: {days || "—"} day(s)</span>
            <button className="btn btn-primary" type="submit">
              Submit request
            </button>
          </div>
        </form>

        <div className="card">
          <h3 style={{ marginBottom: 14 }}>How approval works</h3>
          {["Submitted by you", "Reviewed by your manager", "Balance updated automatically", "Notification sent to you"].map(
            (step, i) => (
              <div key={step} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--green-soft)",
                    color: "var(--forest)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: "0.87rem", paddingTop: 2 }}>{step}</span>
              </div>
            )
          )}
          <div className="divider" />
          <p className="hint">
            Minimum notice period and maximum consecutive days depend on your leave
            policy — check with HR if you're unsure.
          </p>
        </div>
      </div>
    </>
  );
}
