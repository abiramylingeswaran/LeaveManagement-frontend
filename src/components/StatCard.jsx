export default function StatCard({ icon: Icon, label, value, sub, accent = false }) {
  return (
    <div className={"stat-card" + (accent ? " accent" : "")}>
      <div className="stat-label">
        {Icon && <Icon size={14} />}
        {label}
      </div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
