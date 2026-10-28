import { ArrowRight, MapPinned } from "lucide-react";
import { formatDate } from "../../lib/helpers";
import StatusBadge from "../outlets/StatusBadge";
import type { Outlet } from "../../types";

type Props = {
  outlets: Outlet[];
  onSelect: (outlet: Outlet) => void;
  onViewAll: () => void;
};

const RecentCheckins = ({ outlets, onSelect, onViewAll }: Props) => (
  <section className="surface visit-card rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] flex flex-col">
    <div className="section-title-row flex items-start justify-between gap-[15px] px-6 pt-[23px]">
      <div>
        <div className="tiny-eyebrow">RECENT ACTIVITY</div>
        <h2>Latest check-ins</h2>
        <p>Most recently visited locations</p>
      </div>
      <span className="activity-icon w-[34px] h-[34px] rounded-[9px] grid place-items-center bg-[var(--accent-bg)] text-[color:var(--accent)]">
        <MapPinned size={18} />
      </span>
    </div>
    <div className="activity-list p-[14px_22px] flex-1">
      {outlets.slice(0, 4).map((outlet, index) => (
        <button
          onClick={() => onSelect(outlet)}
          key={outlet.id}
          className="activity-item [background:none] border-0 w-full flex items-center gap-[10px] p-[13px_0] text-left [border-bottom:1px_solid_var(--divider)]"
        >
          <span className={`activity-initial activity-${index % 3}`}>
            {outlet.name.charAt(0)}
          </span>
          <span>
            <strong>{outlet.name}</strong>
            <small>
              {outlet.city} · {formatDate(outlet.lastVisit)}
            </small>
          </span>
          <StatusBadge status={outlet.status} />
        </button>
      ))}
      {!outlets.length && <p className="muted text-[color:var(--muted)]">No activity yet.</p>}
    </div>
    <button className="activity-link flex items-center gap-[7px] justify-center m-[0_23px_20px] bg-[var(--surface-2)] [border:1px_solid_var(--border)] rounded-[8px] text-[10.5px] font-extrabold text-[color:var(--accent)] p-[11px]" onClick={onViewAll}>
      View all outlets <ArrowRight size={15} />
    </button>
  </section>
);

export default RecentCheckins;
