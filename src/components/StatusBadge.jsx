const classFor = {
  Approved: "badge-approved",
  Pending: "badge-pending",
  Rejected: "badge-rejected",
  Cancelled: "badge-cancelled",
};

export default function StatusBadge({ status }) {
  return <span className={`badge ${classFor[status] || "badge-cancelled"}`}>{status}</span>;
}
