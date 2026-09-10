import { Save } from "lucide-react";

const configItems = [
  { label: "Organization name", value: "Samuel Gnanam IT Centre" },
  { label: "Working days", value: "Monday – Friday" },
  { label: "Default approval workflow", value: "Employee → Manager → HR" },
  { label: "Leave year starts on", value: "1 January" },
];

export default function Settings() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>System settings</h1>
          <p>Organization-wide configuration for working days and approval defaults.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 560 }}>
        {configItems.map((c) => (
          <div className="field" key={c.label}>
            <label>{c.label}</label>
            <input className="input" defaultValue={c.value} />
          </div>
        ))}
        <button className="btn btn-primary">
          <Save size={15} />
          Save settings
        </button>
      </div>
    </>
  );
}
