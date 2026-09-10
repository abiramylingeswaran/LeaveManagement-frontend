export default function LeafMark({ size = 28, light = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M24 4C10 8 6 20 8 32c1.5 8 8 12 16 12s14.5-4 16-12c2-12-2-24-16-28z"
        fill={light ? "#ffffff" : "#1f5d3a"}
      />
      <path
        d="M24 6V44"
        stroke={light ? "#1f5d3a" : "#f6f8f4"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
