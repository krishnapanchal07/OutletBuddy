import { ArrowRight, Store } from "lucide-react";
import { Link } from "react-router-dom";
import OutletTable from "../outlets/OutletTable";
import type { Outlet } from "../../types";

type Props = {
  outlets: Outlet[];
  onView: (outlet: Outlet) => void;
  onEdit: (outlet: Outlet) => void;
  onDelete: (outlet: Outlet) => void;
  onAdd: () => void;
};

const RecentOutlets = ({ outlets, onView, onEdit, onDelete, onAdd }: Props) => (
  <div className="dashboard-lower mb-[19px]">
    <section className="surface recent-outlets rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
      <div className="section-title-row flex items-start justify-between gap-[15px] px-6 pt-[23px]">
        <div>
          <div className="tiny-eyebrow">YOUR NETWORK</div>
          <h2>Recently visited outlets</h2>
          <p>Latest recorded visits across your locations</p>
        </div>
        <Link className="text-link inline-flex items-center gap-[8px] text-[color:var(--accent)] text-[11px] font-extrabold whitespace-nowrap" to="/outlets">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      {outlets.length ? (
        <OutletTable
          outlets={outlets.slice(0, 5)}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          compact
        />
      ) : (
        <div className="empty-state min-h-[320px] flex items-center flex-col justify-center text-center gap-[11px] p-[25px] text-[color:var(--muted)]">
          <Store size={27} />
          <h3>No outlets yet</h3>
          <p>Add your first location to begin.</p>
          <button className="btn btn-primary" onClick={onAdd}>
            Add outlet
          </button>
        </div>
      )}
    </section>
  </div>
);

export default RecentOutlets;
