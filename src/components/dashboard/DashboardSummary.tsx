import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CircleDot,
  Clock3,
  Store,
  UsersRound,
} from "lucide-react";
import { getPercent } from "../../lib/helpers";

type Props = {
  total: number;
  counts: { active: number; inactive: number; prospect: number };
  recentVisits: number;
};

const DashboardSummary = ({ total, counts, recentVisits }: Props) => (
  <div className="stats-grid mb-5 grid grid-cols-4 gap-[17px]">
    <div className="stat-card rounded-[13px] border border-[var(--border)] bg-[var(--surface)] px-5 pt-[21px] pb-[19px] shadow-[var(--shadow)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[var(--ring-shadow)]">
      <div className="stat-top mb-[18px] flex items-start justify-between">
        <span className="stat-icon stat-icon-violet grid size-11 place-items-center rounded-[11px] bg-[#f2e6f9] text-[color:#9a62c3]">
          <Store size={21} />
        </span>
        <span className="stat-trend flex items-center gap-[2px] bg-[#eff4f0] text-[color:#2e9774] p-[5px_7px] rounded-[7px] text-[10px] font-extrabold">
          <ArrowUpRight size={15} /> Total
        </span>
      </div>
      <p>Total outlets</p>
      <div className="stat-value">
        {total}
        <span> locations</span>
      </div>
      <div className="stat-bottom text-[10px] text-[color:var(--muted)] [border-top:1px_solid_var(--divider)] pt-[14px] mt-[17px] flex items-center gap-[6px]">
        <span className="inline-mark purple-mark w-[7px] h-[7px] inline-block rounded-full bg-[#a66ed6]" /> Across your network
      </div>
    </div>
    <div className="stat-card rounded-[13px] border border-[var(--border)] bg-[var(--surface)] px-5 pt-[21px] pb-[19px] shadow-[var(--shadow)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[var(--ring-shadow)]">
      <div className="stat-top mb-[18px] flex items-start justify-between">
        <span className="stat-icon stat-icon-green grid size-11 place-items-center rounded-[11px] bg-[#e4f7ec] text-[color:#2b9c78]">
          <Activity size={21} />
        </span>
        <span className="stat-trend positive flex items-center gap-[2px] bg-[#eff4f0] text-[color:#2e9774] p-[5px_7px] rounded-[7px] text-[10px] font-extrabold">
          <ArrowUpRight size={15} />
          {getPercent(counts.active, total)}%
        </span>
      </div>
      <p>Active outlets</p>
      <div className="stat-value">
        {counts.active}
        <span> operating</span>
      </div>
      <div className="stat-bottom text-[10px] text-[color:var(--muted)] [border-top:1px_solid_var(--divider)] pt-[14px] mt-[17px] flex items-center gap-[6px]">
        <span className="inline-mark green-mark w-[7px] h-[7px] inline-block rounded-full bg-[#36a983]" /> Currently active
      </div>
    </div>
    <div className="stat-card rounded-[13px] border border-[var(--border)] bg-[var(--surface)] px-5 pt-[21px] pb-[19px] shadow-[var(--shadow)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[var(--ring-shadow)]">
      <div className="stat-top mb-[18px] flex items-start justify-between">
        <span className="stat-icon stat-icon-orange grid size-11 place-items-center rounded-[11px] bg-[#fff4e0] text-[color:#d4a04a]">
          <UsersRound size={21} />
        </span>
        <span className="stat-trend neutral flex items-center gap-[2px] bg-[#eff4f0] text-[color:#2e9774] p-[5px_7px] rounded-[7px] text-[10px] font-extrabold">
          <ArrowDownRight size={15} />
          {getPercent(counts.prospect, total)}%
        </span>
      </div>
      <p>Prospective outlets</p>
      <div className="stat-value">
        {counts.prospect}
        <span> in pipeline</span>
      </div>
      <div className="stat-bottom text-[10px] text-[color:var(--muted)] [border-top:1px_solid_var(--divider)] pt-[14px] mt-[17px] flex items-center gap-[6px]">
        <span className="inline-mark orange-mark w-[7px] h-[7px] inline-block rounded-full bg-[#e0ad52]" /> Potential locations
      </div>
    </div>
    <div className="stat-card rounded-[13px] border border-[var(--border)] bg-[var(--surface)] px-5 pt-[21px] pb-[19px] shadow-[var(--shadow)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[var(--ring-shadow)]">
      <div className="stat-top mb-[18px] flex items-start justify-between">
        <span className="stat-icon stat-icon-blue grid size-11 place-items-center rounded-[11px] bg-[#eaf0fe] text-[color:#668ed0]">
          <Clock3 size={21} />
        </span>
        <span className="stat-trend neutral flex items-center gap-[2px] bg-[#eff4f0] text-[color:#2e9774] p-[5px_7px] rounded-[7px] text-[10px] font-extrabold">
          <CircleDot size={14} /> Last 7 days
        </span>
      </div>
      <p>Recently visited</p>
      <div className="stat-value">
        {recentVisits}
        <span> outlets</span>
      </div>
      <div className="stat-bottom text-[10px] text-[color:var(--muted)] [border-top:1px_solid_var(--divider)] pt-[14px] mt-[17px] flex items-center gap-[6px]">
        <span className="inline-mark blue-mark w-[7px] h-[7px] inline-block rounded-full bg-[#6590d7]" /> Recorded last visits
      </div>
    </div>
  </div>
);

export default DashboardSummary;
