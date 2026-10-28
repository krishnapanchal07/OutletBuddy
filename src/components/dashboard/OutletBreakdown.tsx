import { getPercent } from "../../lib/helpers";

type Props = {
  total: number;
  counts: { active: number; inactive: number; prospect: number };
};

const OutletBreakdown = ({ total, counts }: Props) => {
  const activePercent = getPercent(counts.active, total);
  const withProspectsPercent = getPercent(
    counts.active + counts.prospect,
    total,
  );

  return (
    <section className="surface breakdown-card rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
      <div className="section-title-row flex items-start justify-between gap-[15px] px-6 pt-[23px]">
        <div>
          <div className="tiny-eyebrow">NETWORK HEALTH</div>
          <h2>Outlet breakdown</h2>
          <p>Status distribution across your network</p>
        </div>
      </div>
      <div
        className="breakdown-ring h-[149px] w-[149px] rounded-full p-[20px] m-[20px_auto_15px] grid place-items-center"
        style={{
          background: total
            ? `conic-gradient(#249f79 0% ${activePercent}%, #e5b15c ${activePercent}% ${withProspectsPercent}%, #aab3c5 ${withProspectsPercent}% 100%)`
            : "var(--border)",
        }}
      >
        <div className="ring-inner rounded-full bg-[var(--surface)] h-full w-full flex flex-col items-center justify-center">
          <strong>{total}</strong>
          <span>total outlets</span>
        </div>
      </div>
      <div className="breakdown-legend flex gap-[10px] p-[0_23px_19px] justify-around">
        <div>
          <i className="legend-dot green w-[8px] h-[8px] inline-block rounded-full" />
          <span>Active</span>
          <strong>{counts.active}</strong>
        </div>
        <div>
          <i className="legend-dot orange w-[8px] h-[8px] inline-block rounded-full" />
          <span>Prospect</span>
          <strong>{counts.prospect}</strong>
        </div>
        <div>
          <i className="legend-dot gray w-[8px] h-[8px] inline-block rounded-full" />
          <span>Inactive</span>
          <strong>{counts.inactive}</strong>
        </div>
      </div>
    </section>
  );
};

export default OutletBreakdown;
