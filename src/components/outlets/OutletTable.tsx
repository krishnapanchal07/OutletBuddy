import { ChevronRight, Eye, MapPin, Pencil, Trash2 } from "lucide-react";
import type { Outlet } from "../../types";
import { formatDate, initials } from "../../lib/helpers";
import StatusBadge from "./StatusBadge";

export default function OutletTable({
  outlets,
  onView,
  onEdit,
  onDelete,
  compact = false,
}: {
  outlets: Outlet[];
  onView: (o: Outlet) => void;
  onEdit: (o: Outlet) => void;
  onDelete: (o: Outlet) => void;
  compact?: boolean;
}) {
  return (
    <>
      <div className={`table-scroll ${compact ? "compact-table" : ""}`}>
        <table className="outlet-table">
          <thead>
            <tr>
              <th>OUTLET</th>
              <th>OWNER</th>
              <th>LOCATION</th>
              <th>STATUS</th>
              <th>LAST VISIT</th>
              <th className="actions-cell text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map((o, index) => (
              <tr
                key={o.id}
                style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
              >
                <td>
                  <button
                    className="outlet-identity flex items-center gap-[11px] [background:none] border-0 p-0 text-left max-w-full text-[color:inherit]"
                    onClick={() => onView(o)}
                    title={`View ${o.name}`}
                  >
                    <span className={`outlet-avatar avatar-${index % 5}`}>
                      {initials(o.name)}
                    </span>
                    <span>
                      <strong>{o.name}</strong>
                      <small>{o.id}</small>
                    </span>
                  </button>
                </td>
                <td>
                  <div className="cell-main text-[11px] font-bold whitespace-nowrap text-[color:var(--text-strong)]">{o.owner}</div>
                  <div className="cell-sub text-[10px] text-[color:var(--muted)] pt-[5px]">{o.phone}</div>
                </td>
                <td>
                  <div className="location-cell flex items-start gap-[6px] text-[color:var(--text)] max-w-[175px]">
                    <MapPin size={14} />
                    <span>
                      {o.address}
                      <small>{o.city}</small>
                    </span>
                  </div>
                </td>
                <td>
                  <StatusBadge status={o.status} />
                </td>
                <td>
                  <span className="date-text text-[10.7px] text-[color:var(--muted)] whitespace-nowrap">{formatDate(o.lastVisit)}</span>
                </td>
                <td>
                  <div className="table-actions flex gap-[2px] justify-end">
                    <button
                      className="icon-button border-0 bg-[transparent] text-[color:var(--muted)] inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
                      aria-label={`View ${o.name}`}
                      title="View details"
                      onClick={() => onView(o)}
                    >
                      <Eye size={17} />
                    </button>
                    <button
                      className="icon-button border-0 bg-[transparent] text-[color:var(--muted)] inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
                      aria-label={`Edit ${o.name}`}
                      title="Edit"
                      onClick={() => onEdit(o)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="icon-button danger-hover border-0 bg-[transparent] text-[color:var(--muted)] inline-flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
                      aria-label={`Delete ${o.name}`}
                      title="Delete"
                      onClick={() => onDelete(o)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mobile-outlet-list hidden">
        {outlets.map((o, index) => (
          <button
            className="mobile-outlet-card"
            key={o.id}
            onClick={() => onView(o)}
          >
            <span className={`outlet-avatar avatar-${index % 5}`}>
              {initials(o.name)}
            </span>
            <span className="mobile-card-info">
              <strong>{o.name}</strong>
              <small>
                {o.owner} · {o.city}
              </small>
              <StatusBadge status={o.status} />
            </span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </>
  );
}
