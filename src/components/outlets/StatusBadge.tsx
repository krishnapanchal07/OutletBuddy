import type { OutletStatus } from "../../types";
export default function StatusBadge({ status }: { status: OutletStatus }) {
  return (
    <span className={`status-badge status-${status.toLowerCase()}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}
