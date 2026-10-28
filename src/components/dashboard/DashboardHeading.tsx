import { CalendarDays, Plus } from "lucide-react";

const dateToday = () =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

type Props = { onAdd: () => void };

const DashboardHeading = ({ onAdd }: Props) => (
  <div className="page-heading mb-[30px] flex items-end justify-between gap-5">
    <div>
      <div className="page-eyebrow">
        <span className="eyebrow-dot bg-[var(--accent)] w-[6px] h-[6px] rounded-full" /> YOUR WORKSPACE AT A GLANCE
      </div>
      <h1>
        Good to see you <span className="heading-star text-[color:#e4a754] text-[28px] font-medium">✳</span>
      </h1>
      <p>Here's what's happening across your outlet network today.</p>
    </div>
    <div className="heading-right flex items-center gap-[11px] pb-[3px]">
      <span className="date-chip flex items-center gap-[8px] text-[color:var(--muted)] text-[11.5px] bg-[var(--surface)] p-[12px_15px] [border:1px_solid_var(--border)] rounded-[9px] whitespace-nowrap">
        <CalendarDays size={16} />
        {dateToday()}
      </span>
      <button className="btn btn-primary" onClick={onAdd}>
        <Plus size={17} /> Add outlet
      </button>
    </div>
  </div>
);

export default DashboardHeading;
